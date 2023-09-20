module.exports = function(grunt){
    grunt.initConfig({
        concat : {
            options :{
                separator : '\n\n//------------------------------------\n',
                banner : '\n\n//------------------------------------\n'
            },
           /* desktopdb : {
                src: ['data/MDT_810-0042-270.db'],
                dest: 'builds/desktop/data/MDT_810-0042-270.db' 
            },
            webdb : {
                src: ['data/MDT_810-0042-270.db'],
                dest: 'builds/web/data/MDT_810-0042-270.db' 
            },
			*/
			desktopjs : {
                src: ['components/js/controller.js','components/js/dataAccessComponent.js','components/js/svg.js', ],
                dest: 'builds/desktop/js/script.js' 
            },
            webjs : {
                src: ['components/js/controller.js','components/js/svg.js', ],
                dest: 'builds/web/js/script.js' 
            }
        },

        copy : {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, src: ['node_modules/**'], dest: 'builds/desktop'},
					{expand: true, src: ['node_modules/angular/**'], dest: 'builds/web'},
                    {expand: true, src: ['sqlite3/lib/binding/node-webkit-v0.22.1-win32-x64/*'], dest: 'builds/desktop/node_modules'},
					{expand: true, src: ['components/jquery-1.4.2.min.js'], dest: 'builds/web/js'},
					{expand: true, flatten:true, src: ['components/scorm/*'], dest: 'builds/web/js/scorm'},
					{expand: true, src: ['components/jquery-1.4.2.min.js'], dest: 'builds/desktop/js'},
                    {expand: true, src: ['data/MDT_810-0042-270.db'], dest: 'builds/desktop'},
                    {expand: true, src: ['data/MDT_810-0042-270.db'], dest: 'builds/web'},
                    {expand: true, src: ['css/**'], dest: 'builds/desktop'},
                    {expand: true, src: ['css/**'], dest: 'builds/web'},
                    {expand: true, src: ['graphics/**'], dest: 'builds/desktop'},
                    {expand: true, src: ['graphics/**'], dest: 'builds/web'},
                ],
            },
        },
        watch: {
            options: {
                spawn: false,
            },
            scripts: {
                files: ['components/js/*.js','components/lib/*.js'],
            },

        }
    }); //initConfig
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
   
    grunt.registerTask('default',['concat', 'copy', 'watch']);
   // grunt.registerTask('default',['concat:dev']);
}; // wrapper function