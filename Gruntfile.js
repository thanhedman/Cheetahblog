module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          'assets/bower_components/jquery/dist/jquery.min.js', 
          'assets/bower_components/bootstrap/dist/js/bootstrap.min.js',
          'assets/bower_components/flipclock/compiled/flipclock.min.js'
        ],
        dest: 'assets/js/lib.js'
      }
    },
    concat_css: {
      all: {
        src: [
          'assets/bower_components/bootstrap/dist/css/bootstrap.min.css',
          'assets/bower_components/flipclock/compiled/flipclock.css'
        ],
        dest: "assets/css/lib.css"
      },
    },
    copy: {
      main: {
        files: [
          // JS
          {expand: true, flatten: true, src: ['Front End/*.js'], dest: 'assets/js/'},

          // CSS
          {expand: true, flatten: true, src: ['Front End/*.css'], dest: 'assets/css/'},

          // HTML
          {expand: true, flatten: true, src: ['Front End/*.html'], dest: 'www/'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['concat', 'concat_css', 'copy']);

};