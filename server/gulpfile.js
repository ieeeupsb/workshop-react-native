const gulp = require('gulp')
const gulpUtil = require('gulp-util')
const spawn = require('child_process').spawn
const exec = require('child_process').exec
let node = undefined   


gulp.task('default', () =>{
    return gulpUtil.log("Gulp is up")
})

gulp.task('build', () => { 
    let proc = exec('tsc') //??????

    proc.on('close', (code) => {
        if(code === 8){
            console.log("Error, waiting for further changes")
        }
        console.log(code)
    })
    proc.stdout.on('data', (data) => {
        console.log(data.toString())
    })

    proc.stderr.on('data', (data) => {
        console.log(data.toString())
    })
})

gulp.task('server', () => {
    if(node){
        node.kill()
    }

    node = spawn('node', ['./dist/server.js'])
    node.on('close', (code) => {
        if(code === 8){
            console.log("Error, waiting for further changes")
        }
    })
    node.stdout.on('data', (data) => {
        console.log(data.toString())
    })

    node.stderr.on('data', (data) => {
        console.log(data.toString())
    })
})

gulp.task('watch', () => {
    gulp.watch('src/*', ['build', 'server'])
})