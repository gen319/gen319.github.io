/**
 * WordPress Gulp.js Critical CSS Task Package
 *
 * This file contains a task to create critical path CSS.
 *
 * @package    abovethefold
 * @subpackage abovethefold/modules/critical-css-build-tool
 * @author     PageSpeed.pro <info@pagespeed.pro>
 */
module.exports = function (gulp, plugins, critical) {
    return function (cb) {

    	var taskname = "critical-css";
    	var taskpath = taskname + '/';

    	// check if html file exists in package
    	if (!plugins.fs.existsSync(taskpath + 'page.html')) {
    		throw new Error('page.html does not exist in package');
            return false;
        }

    	// check if full css file exists in package
    	if (!plugins.fs.existsSync(taskpath + 'full.css')) {
    		throw new Error('full.css does not exist in package');
            return false;
        }

        var extraCSS = false;

    	// check if extra css file exists in package
    	if (plugins.fs.existsSync(taskpath + 'extra.css')) {
    		extraCSS = true;
        }


        // optimization tasks
        var TASKS = {};

        // Clean output directory
        TASKS['clean'] = function() {
        	return new Promise(function(resolve, reject) {

				console.log('\nCleaning output directory', plugins.util.colors.red.bold('/'+taskpath+'output/'),'...');

				gulp.src([taskpath + 'output'], { read: false })
        			.pipe(plugins.clean())
					.on('error', reject)
					.on('data', function () {}) 
					.on('end', resolve);

			});
        };

        // create citical CSS
        TASKS['critical'] = function() {

        	console.log('\n' + plugins.util.colors.yellow.bold('Creating Critical Path CSS...'));

			/**
	    	 * Perform critical CSS generation
	    	 * @link https://github.com/addyosmani/critical
	    	 */
	    	return critical.generate({
		        inline: false, // generate
		        base: taskpath ,
		        src: 'page.html',
		        dest: 'output/critical.css',
		        minify: false,
				css: [
    taskpath + "\/css\/1-natureworksbest-com-g1-gmaps.css",
    taskpath + "\/css\/2-natureworksbest-com-main.css",
    taskpath + "\/css\/3-fonts-googleapis-com-css",
    taskpath + "\/css\/4-natureworksbest-com-style.css",
    taskpath + "\/css\/5-natureworksbest-com-settings.css",
    taskpath + "\/css\/6-natureworksbest-com-g1-screen.css",
    taskpath + "\/css\/7-natureworksbest-com-g1-dynamic-style.css",
    taskpath + "\/css\/8-natureworksbest-com-galleria.classic.css",
    taskpath + "\/css\/9-natureworksbest-com-magnific-popup.css",
    taskpath + "\/css\/10-natureworksbest-com-style.css",
    taskpath + "\/css\/11-fonts-googleapis-com-css",
    taskpath + "\/css\/12-fonts-googleapis-com-css",
    taskpath + "\/css\/13-fonts-googleapis-com-css",
    taskpath + "\/css\/14-aed49a24a8e74fe681361635bae0e85f.css",
    taskpath + "\/css\/15-baf3c2f05f04b2d7c182c60bfbba8ca8.css",
    taskpath + "\/css\/16-a9c44c215631481cbcbd945262d5ccf2.css",
    taskpath + "\/css\/17-728297d066799ffd604a2eeb940de597.css",
    taskpath + "\/css\/18-2b325a3f3f4fbabf0ee02454994fe9fc.css",
    taskpath + "\/css\/19-2592afe56232a76557e05b521c5a76bb.css",
    taskpath + "\/css\/20-a9ff79353d9ed21ef80b41ed267328e5.css",
    taskpath + "\/css\/21-c8be9cc5298d55ed8b02b9067e02409e.css",
    taskpath + "\/css\/22-bcdf7725f12d651c71d82073ee1e0e0a.css",
    taskpath + "\/css\/23-b426336f60646088e35eaadd4df217a3.css",
    taskpath + "\/css\/24-75c4f28f7e6f7aee7622d1c0af3963eb.css",
    taskpath + "\/css\/25-1c5e619f688ea4c18a7a8a81c8ce04a3.css",
    taskpath + "\/css\/26-2465ec3cd134f515dc6cccbd8f8b0d0a.css",
    taskpath + "\/css\/27-95541e10b3e069d97ea12765f9ea5bd3.css",
    taskpath + "\/css\/28-58f3c2a675e69bd1320e24880867ea27.css"
],
				extract: false,
				width: 1300,
				height: 900,
				pathPrefix: '../../../../', // wordpress root from /themes/THEME-NAME/abovethefold/
				timeout: 120000
		    });
        };

        // concatenate extra.css
        TASKS['concat'] = function() {
			return new Promise(function(resolve, reject) {

				if (!extraCSS) {
					resolve();
					return;
				}

				console.log(plugins.util.colors.white.bold(' ➤ Append extra.css to critical.css...'));

				// append extra.css
				gulp.src([taskpath + 'output/critical.css', taskpath + 'extra.css'])
				    .pipe(plugins.concat('critical+extra.css'))
			        .pipe(gulp.dest(taskpath + 'output'))
	    			.on('error', reject)
			        .on('end', resolve);

			});
        };

        // minify
        TASKS['minify'] = function() {
        	return new Promise(function(resolve, reject) {

				console.log(plugins.util.colors.white.bold(' ➤ Minify critical CSS...'));

				// append extra.css
				gulp.src(['!*.min.css',taskpath + 'output/*.css'])
					.pipe(plugins.cssmin({
			            "keepSpecialComments": false,
			            "advanced": true,
			            "aggressiveMerging": true,
			            "showLog": true
					}))    				.pipe(plugins.rename({ suffix: '.min' }))
			        .pipe(gulp.dest(taskpath + 'output/'))
	    			.on('error', reject)
			        .on('end', resolve);
			})
        };

        // copy critical-css to storage location
        TASKS['copy'] = function() {
			return new Promise(function(resolve, reject) {

resolve();			});

        };

        // print size
        TASKS['size'] = function() {
        	return new Promise(function(resolve, reject) {

				console.log('\nCritical CSS processor completed successfully. The critical CSS files are located in /critical-css/output/');

				gulp.src(taskpath + 'output/*')
	    			.pipe(plugins.size( { showFiles: true } ))
	    			.on('error', reject)
			        .on('end', resolve)
			        .pipe(gulp.dest('output', { overwrite: false } ));
			});
        };

        // process optimization tasks
        TASKS['clean']()
        	.then(function() {
	        	return TASKS['critical']()
	        }).then(function() {
	        	return TASKS['concat']()
	        }).then(function() {
	        	return TASKS['minify']()
			}).then(function() {
	        	return TASKS['copy']()
			}).then(function() {
	        	return TASKS['size']()
			}).then(
        		function() {
					cb();
				}
        	);

    };
};
