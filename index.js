const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//Set canvas size to fit the screen... could this be relative to fit all screens? this is a 16:9 aspect ratio
canvas.width = 1024 
canvas.height = 576




let y = 100
function animate() { 
    window.requestAnimationFrame(animate)
//^^ Calling recursive function to allow animation to happen
c.fillStyle = "white"
c.fillRect(0, 0, canvas.width, canvas.height)
//^^ Creates white canvas background, within function to clear background each time to stop character "dripping"

c.fillStyle = "red"
c.fillRect(200, y, 100, 100)
y++
//^^ creates player with red blocking that falls on the y axis 
}

animate()