'use strict';

import config from '../config/default';

import gulp from 'gulp';
import notify from 'gulp-notify';
import clean from 'gulp-clean';

import iconfont from 'gulp-iconfont';
import iconfontCss from 'gulp-iconfont-css';
var runTimestamp = Math.round(Date.now()/1000);

export default () => {
    return gulp.src( config.paths.source + '/less/core', { read: false } )
        .on('end', function(){
            return gulp.src( config.paths.source + '/icons/**' )
                .pipe(iconfontCss({
                    fontName: 'icons-webfont',
                    path: config.paths.source + '/less/core/_icons.less',
                    targetPath: '../../../source/less/core/icons.less',
                    fontPath: '../icons/'
                }))
                .pipe(iconfont({
                    fontName: 'icons-webfont', // required
                    prependUnicode: true, // recommended option
                    formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'], // default, 'woff2' and 'svg' are available
                    normalize: true,
                    timestamp: runTimestamp, // recommended to get consistent builds when watching files
                }))
                .pipe(gulp.dest( config.paths.test + '/' + config.paths.assets.icons ));
        });
}
