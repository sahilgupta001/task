const express = require('express')
const app = express()

app.get("/", (req, res) => {
    coeff_of_restitution = 0.6 //Initial coorelation coefficient value
    var height = 1             //variable to track for the heights after each bounce(used in loop)
    var initial_height = 10    //Assumed height of the ball (initially) in meters
    var g = 9.8                //gravitational accelaration 
    var bounce = 0              
    
    //calculating the initial coordinates of the graph
    var initial_velocity = Math.sqrt(2 * g * initial_height)
    var down_time = initial_height / initial_velocity
    
    // final data object
    var data = {}
    var key = "pass"
    data[key] = []
    
    //coordinates array
    coordinates = []
    coordinates.push({x: 0, y: initial_height});
    coordinates.push({x: down_time, y: 0});
    
    // Iterating uptil the height of the curve falls under 0.001m

    while (height > 0.001) {
        new_velocity = coeff_of_restitution * initial_velocity //calculating the velocity after fall
        height = (new_velocity * new_velocity) / (2 * g) //calculating the next height of the ball
        up_time = height / new_velocity  //calculating the time that the ball will take to attain that height
        bounce = bounce + 1   // adding the bounce values
        
        down_time = height * initial_velocity //calculaating the time that the ball will take to fall down to height 0
        
        coordinates.push({x: up_time, y: height}); // pushing the coordinates for upward movement
        coordinates.push({x: down_time, y: 0}); // pushing the coordinates for downwards movement
        
        // Preparing the json object
        current_data = {
            height: height,
            bounce_no: bounce,
            initial_velocity: initial_velocity,
            velocity_after_rebound: new_velocity,
            coeff_of_restitution: coeff_of_restitution
        }
        data[key].push(current_data)
        // Iterating
        initial_velocity = new_velocity
    }

    // Seding back the combined response
    res.status(200).json({
        message: 'The required data is...',
        coordinates_array: coordinates,
        no_of_bounces: bounce,
        calculations: data
    })
    // res.send(coordinates)
})



app.listen(3000, () => {
    console.log("Example app listening at http://127.0.0.1:3000");
});
