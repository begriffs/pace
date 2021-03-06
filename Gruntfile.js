module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['*.js', 'public/scripts/main.js']
    },
    requirejs: {
      compile: {
        options: {
          name: '../bower/almond/almond',
          include: "main",
          baseUrl: "public/scripts",
          mainConfigFile: "public/scripts/main.js",
          out: "public/scripts/optimized.js",
          uglify: {
            toplevel: true,
            ascii_only: true,
            max_line_length: 1000,

            //How to pass uglifyjs defined symbols for AST symbol replacement,
            //see "defines" options for ast_mangle in the uglifys docs.
            defines: {
                DEBUG: ['name', 'false']
            },

            //Custom value supported by r.js but done differently
            //in uglifyjs directly:
            //Skip the processor.ast_mangle() part of the uglify call (r.js 2.0.5+)
            no_mangle: true
          }
        }
      }
    },
    stylus: {
      compile: {
        files: {
          'public/style/main.css': [
            'views/style/reset.styl',
            'views/style/mixins.styl',
            'views/style/main.styl'
          ]
        }
      }
    },
    watch: {
      lint: {
        files: ['*.js', 'public/scripts/main.js'],
        tasks: 'jshint'
      },
      compile_js: {
        files: ['*.js', 'public/scripts/main.js'],
        tasks: 'requirejs'
      },
      compile_stylus: {
        files: ['views/style/reset.styl', 'views/style/mixins.styl', 'views/style/main.styl'],
        tasks: 'stylus'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('precompile', ['jshint', 'stylus', 'requirejs']);

};
