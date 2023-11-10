const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//Set canvas size to fit the screen... could this be relative to fit all screens? this is a 16:9 aspect ratio
canvas.width = 1024 
canvas.height = 576


// set the context fillstyle to white as it is automatically matching the background white
c.fillStyle = "white"

//Set the size of the context object and original location, this will be our canvas to draw on
// Arguments are X access, Y access, width, height
c.fillRect(0, 0, canvas.width, canvas.height)