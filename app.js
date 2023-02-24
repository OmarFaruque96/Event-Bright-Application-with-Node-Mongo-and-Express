const express = require('express')
const { connectToDb, getDb } = require('./db')

const app = express()

// db connection
let db 
connectToDb((err)=>{
    if(!err){
        app.listen(3000, ()=>{
            console.log("connected to mondodb on port 3000")
        }) 
        db = getDb()
    }
})

// show all the events in frontpage
app.get("/", (req,res)=>{
    let events = []
    db.collection('events')
        .find()
        .forEach(event => events.push(event))
        .then(()=>{
            res.status(200).json(events)
        })
        .catch((err)=>{
            res.status(500).json({error: 'Could not fetch the documents'})
        })

   // res.json({mssg: "Welcome to the api"})
})