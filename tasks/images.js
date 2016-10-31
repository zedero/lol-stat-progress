'use strict';

import config from '../config/default';

import gulp from 'gulp';

export default () => {

    return gulp.src([
            '!' + config.paths.source + '/images/favicon.*', 
            '!' + config.paths.source + '/images/apple-touch-icon-precomposed.png', 
            './' + config.paths.source + '/images/**/*'
        ], { buffer: false } )
       .pipe(gulp.dest( config.paths.test + '/' + config.paths.assets.images ));
}
