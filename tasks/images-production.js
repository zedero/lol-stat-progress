'use strict';

import config from '../config/default';

import gulp from 'gulp';
import imagemin from 'gulp-imagemin';

export default () => {

    return gulp.src([
            '!' + config.paths.source + '/images/favicon.*',
            '!' + config.paths.source + '/images/apple-touch-icon-precomposed.png', 
            config.paths.source + '/images/**/*'
        ])
        .pipe(imagemin({ progressive: true }))
        .pipe(gulp.dest( config.paths.build + '/' + config.paths.assets.images ));
   
}
