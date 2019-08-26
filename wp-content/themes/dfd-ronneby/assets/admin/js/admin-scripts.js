(function($) {
	"use strict";
	var initColorpicker = function() {
		$('.dfd-widget-colorpicker-field').each(function() {
			$(this).wpColorPicker();
		});
	};
	$(document).ready(function() {
		$('body:not(.post-type-product)').on('click','.upload_image_button',function(e) {
			var custom_uploader, attachment;
			var $self;
			$self = $(this);
			e.preventDefault();
			//If the uploader object has already been created, reopen the dialog
			if (custom_uploader) {
				custom_uploader.open();
				return;
			}

			//Extend the wp.media object
			custom_uploader = wp.media.frames.file_frame = wp.media({
				title: 'Choose Image',
				button: {
					text: 'Choose Image'
				},
				multiple: false
			});

			//When a file is selected, grab the URL and set it as the text field's value
			custom_uploader.on('select', function() {
				attachment = custom_uploader.state().get('selection').first().toJSON();
				$self.siblings('.upload_image').val(attachment.url);
				$self.siblings('.image_uploaded').attr('src',attachment.url).css('display','block');
				custom_uploader.close();
			});

			//Open the uploader dialog
			custom_uploader.open();
		});
		$('body').on('click','.remove_image_button',function(e) {
			var $self = $(this);
			e.preventDefault();
			var $self = $(this);
			$self.siblings('.upload_image').val('');
			$self.siblings('.image_uploaded').attr('src','').css('display','none');
		});
		$('.edit-menu-item-_dfd_mega_menu_enabled').each(function() {
			var $self = $(this);
			var $image_select = $self.parent().parent().siblings('.field-_dfd_mega_menu_image');
			var $image_position = $self.parent().parent().siblings('.field-_dfd_mega_menu_bg_position');
			var $image_repeat = $self.parent().parent().siblings('.field-_dfd_mega_menu_bg_repeat');
			var $columns_limit = $self.parent().parent().siblings('.field-_dfd_mega_menu_limit_columns');
			if($self.val() == 0) {
				$image_select.hide();
				$image_position.hide();
				$image_repeat.hide();
				$columns_limit.hide();
			}
			$self.change(function() {
				if($self.val() == 1) {
					$image_select.show();
					$image_position.show();
					$image_repeat.show();
					$columns_limit.show();
				}else {
					$image_select.hide();
					$image_position.hide();
					$image_repeat.hide();
					$columns_limit.hide();
				}
			});
		});

		var menu_icon = $("input.edit-menu-item-_dfd_mega_menu_icon");

		if (0 == menu_icon.siblings("a").length && false == menu_icon.hasClass("iconname")) {
			menu_icon.addClass("iconname").after("<a href=\"#\" class=\"button crum-icon-add\">Add icon</a>");
		}
		
		initColorpicker();
	});
	$(document).on('widget-added widget-updated', initColorpicker);
})(jQuery);

/**!
 * wp-color-picker-alpha
 *
 * Overwrite Automattic Iris for enabled Alpha Channel in wpColorPicker
 * Only run in input and is defined data alpha in true
 *
 * Version: 2.1.1
 * https://github.com/kallookoo/wp-color-picker-alpha
 * Licensed under the GPLv2 license.
 */
!function(t){var e="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAAHnlligAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHJJREFUeNpi+P///4EDBxiAGMgCCCAGFB5AADGCRBgYDh48CCRZIJS9vT2QBAggFBkmBiSAogxFBiCAoHogAKIKAlBUYTELAiAmEtABEECk20G6BOmuIl0CIMBQ/IEMkO0myiSSraaaBhZcbkUOs0HuBwDplz5uFJ3Z4gAAAABJRU5ErkJggg==",r='<button type="button" class="button wp-color-result" aria-expanded="false"><span class="wp-color-result-text"></span></button>',o='<div class="wp-picker-holder" />',a='<div class="wp-picker-container" />',i='<input type="button" class="button button-small" />';_deprecated=void 0!==wpColorPickerL10n.current,_deprecated&&(r='<a tabindex="0" class="wp-color-result" />'),Color.fn.toString=function(){if(this._alpha<1)return this.toCSS("rgba",this._alpha).replace(/\s+/g,"");var t=parseInt(this._color,10).toString(16);return this.error?"":(t.length<6&&(t=("00000"+t).substr(-6)),"#"+t)},t.widget("wp.wpColorPicker",t.wp.wpColorPicker,{_create:function(){if(t.support.iris){var n=this,l=n.element;if(t.extend(n.options,l.data()),"hue"===n.options.type)return n._createHueOnly();n.close=t.proxy(n.close,n),n.initialValue=l.val(),l.addClass("wp-color-picker"),_deprecated?(l.hide().wrap(a),n.wrap=l.parent(),n.toggler=t(r).insertBefore(l).css({backgroundColor:n.initialValue}).attr("title",wpColorPickerL10n.pick).attr("data-current",wpColorPickerL10n.current),n.pickerContainer=t(o).insertAfter(l),n.button=t(i).addClass("hidden")):(l.parent("label").length||(l.wrap("<label></label>"),n.wrappingLabelText=t('<span class="screen-reader-text"></span>').insertBefore(l).text(wpColorPickerL10n.defaultLabel)),n.wrappingLabel=l.parent(),n.wrappingLabel.wrap(a),n.wrap=n.wrappingLabel.parent(),n.toggler=t(r).insertBefore(n.wrappingLabel).css({backgroundColor:n.initialValue}),n.toggler.find(".wp-color-result-text").text(wpColorPickerL10n.pick),n.pickerContainer=t(o).insertAfter(n.wrappingLabel),n.button=t(i)),n.options.defaultColor?(n.button.addClass("wp-picker-default").val(wpColorPickerL10n.defaultString),_deprecated||n.button.attr("aria-label",wpColorPickerL10n.defaultAriaLabel)):(n.button.addClass("wp-picker-clear").val(wpColorPickerL10n.clear),_deprecated||n.button.attr("aria-label",wpColorPickerL10n.clearAriaLabel)),_deprecated?l.wrap('<span class="wp-picker-input-wrap" />').after(n.button):(n.wrappingLabel.wrap('<span class="wp-picker-input-wrap hidden" />').after(n.button),n.inputWrapper=l.closest(".wp-picker-input-wrap")),l.iris({target:n.pickerContainer,hide:n.options.hide,width:n.options.width,mode:n.options.mode,palettes:n.options.palettes,change:function(r,o){n.options.alpha?(n.toggler.css({"background-image":"url("+e+")"}),_deprecated?n.toggler.html('<span class="color-alpha" />'):(n.toggler.css({position:"relative"}),0==n.toggler.find("span.color-alpha").length&&n.toggler.append('<span class="color-alpha" />')),n.toggler.find("span.color-alpha").css({width:"45px",height:"43px",position:"absolute",top:0,left:0,"border-top-left-radius":"2px","border-bottom-left-radius":"2px",background:o.color.toString()})):n.toggler.css({backgroundColor:o.color.toString()}),t.isFunction(n.options.change)&&n.options.change.call(this,r,o)}}),l.val(n.initialValue),n._addListeners(),n.options.hide||n.toggler.click()}},_addListeners:function(){var e=this;e.wrap.on("click.wpcolorpicker",function(t){t.stopPropagation()}),e.toggler.click(function(){e.toggler.hasClass("wp-picker-open")?e.close():e.open()}),e.element.on("change",function(r){(""===t(this).val()||e.element.hasClass("iris-error"))&&(e.options.alpha?(_deprecated&&e.toggler.removeAttr("style"),e.toggler.find("span.color-alpha").css("backgroundColor","")):e.toggler.css("backgroundColor",""),t.isFunction(e.options.clear)&&e.options.clear.call(this,r))}),e.button.on("click",function(r){t(this).hasClass("wp-picker-clear")?(e.element.val(""),e.options.alpha?(_deprecated&&e.toggler.removeAttr("style"),e.toggler.find("span.color-alpha").css("backgroundColor","")):e.toggler.css("backgroundColor",""),t.isFunction(e.options.clear)&&e.options.clear.call(this,r)):t(this).hasClass("wp-picker-default")&&e.element.val(e.options.defaultColor).change()})}}),t.widget("a8c.iris",t.a8c.iris,{_create:function(){if(this._super(),this.options.alpha=this.element.data("alpha")||!1,this.element.is(":input")||(this.options.alpha=!1),void 0!==this.options.alpha&&this.options.alpha){var e=this,r=e.element,o=t('<div class="iris-strip iris-slider iris-alpha-slider"><div class="iris-slider-offset iris-slider-offset-alpha"></div></div>').appendTo(e.picker.find(".iris-picker-inner")),a={aContainer:o,aSlider:o.find(".iris-slider-offset-alpha")};void 0!==r.data("custom-width")?e.options.customWidth=parseInt(r.data("custom-width"))||0:e.options.customWidth=100,e.options.defaultWidth=r.width(),(e._color._alpha<1||-1!=e._color.toString().indexOf("rgb"))&&r.width(parseInt(e.options.defaultWidth+e.options.customWidth)),t.each(a,function(t,r){e.controls[t]=r}),e.controls.square.css({"margin-right":"0"});var i=e.picker.width()-e.controls.square.width()-20,n=i/6,l=i/2-n;t.each(["aContainer","strip"],function(t,r){e.controls[r].width(l).css({"margin-left":n+"px"})}),e._initControls(),e._change()}},_initControls:function(){if(this._super(),this.options.alpha){var t=this;t.controls.aSlider.slider({orientation:"vertical",min:0,max:100,step:1,value:parseInt(100*t._color._alpha),slide:function(e,r){t._color._alpha=parseFloat(r.value/100),t._change.apply(t,arguments)}})}},_change:function(){this._super();var t=this,r=t.element;if(this.options.alpha){var o=t.controls,a=parseInt(100*t._color._alpha),i=t._color.toRgb(),n=["rgb("+i.r+","+i.g+","+i.b+") 0%","rgba("+i.r+","+i.g+","+i.b+", 0) 100%"],l=t.options.defaultWidth,s=t.options.customWidth,p=t.picker.closest(".wp-picker-container").find(".wp-color-result");o.aContainer.css({background:"linear-gradient(to bottom, "+n.join(", ")+"), url("+e+")"}),p.hasClass("wp-picker-open")&&(o.aSlider.slider("value",a),t._color._alpha<1?(o.strip.attr("style",o.strip.attr("style").replace(/rgba\(([0-9]+,)(\s+)?([0-9]+,)(\s+)?([0-9]+)(,(\s+)?[0-9\.]+)\)/g,"rgb($1$3$5)")),r.width(parseInt(l+s))):r.width(l))}(r.data("reset-alpha")||!1)&&t.picker.find(".iris-palette-container").on("click.palette",".iris-palette",function(){t._color._alpha=1,t.active="external",t._change()})},_addInputListeners:function(t){var e=this,r=function(r){var o=new Color(t.val()),a=t.val();t.removeClass("iris-error"),o.error?""!==a&&t.addClass("iris-error"):o.toString()!==e._color.toString()&&("keyup"===r.type&&a.match(/^[0-9a-fA-F]{3}$/)||e._setOption("color",o.toString()))};t.on("change",r).on("keyup",e._debounce(r,100)),e.options.hide&&t.on("focus",function(){e.show()})}})}(jQuery),jQuery(document).ready(function(t){t(".dfd-color-picker").wpColorPicker()});
!function(a){a(document).ready(function(){a(document).click(function(b){"undefined"!=typeof a.fn.iris&&(a(b.target).is(".wp-picker-container, .iris-picker, .iris-picker-inner")||a(".wp-color-picker").iris("hide"))})})}(jQuery);