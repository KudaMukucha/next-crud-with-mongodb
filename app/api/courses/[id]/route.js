import mongoDbConnect from "@/libs/mongodb"
import Course from "@/models/course"
import { NextResponse } from "next/server"

export async function GET(request,{params:{id}}){
    try {
    //connect to the database
    await mongoDbConnect()
    //get data using the model
    const course = await Course.findOne({_id:id})
 return NextResponse.json({
     message:'Ok',
     data:course
 },{
     status:200
 })
    } catch (error) {
     return NextResponse.json({
         message:'Failed to fetch courses..',
         error
     },{
         status:500
     }
     )
    }
 }

 //Update a course
export async function PUT(request,{params:{id}}){
    try {
        //First get data from request
        const {newTitle:title,newDescription:description} = await request.json()
        const newCourse = {
            title,
            description
        }
        //connect to the db
        await mongoDbConnect()
        //use model to update
        await Course.findByIdAndUpdate(id,newCourse)
        return NextResponse.json({
            message:'Course updated successfully...',
            data:newCourse
        },
        {
            status:201
        })
    } catch (error) {
        return NextResponse.json({
            message:'Failed to update a course..',
            error
        },{
            status:500
        }
        )
    }
}