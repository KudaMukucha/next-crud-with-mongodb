import mongoDbConnect from "@/libs/mongodb"
import Course from "@/models/course"
import { NextResponse } from "next/server"

export async function GET(request){
   try {
   //connect to the database
   await mongoDbConnect()
   //get data using the model
   const courses = await Course.find()
return NextResponse.json({
    message:'Ok',
    data:courses
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

//Create a course
export async function POST(request){
    try {
        //First get data from request
        const {title,description} = await request.json()
        const newCourse = {
            title,
            description
        }
        //connect to the db
        await mongoDbConnect()
        //use model to create
        await Course.create(newCourse)
        return NextResponse.json({
            message:'Course created successfully...',
            data:newCourse
        },
        {
            status:201
        })
    } catch (error) {
        return NextResponse.json({
            message:'Failed to create a course..',
            error
        },{
            status:500
        }
        )
    }
}

//Delete a course
export async function DELETE(request){
    try {
        //get Id of course to be deleted
        const id = request.nextUrl.searchParams.get("id")
        console.log(id);
        //connect to database
        await mongoDbConnect()
        //use the model to delete
        await Course.findByIdAndDelete(id)
        //return the response 
        return NextResponse.json(
            {
                message:'Course deleted successfully...'
            },
          {
            status:200
          }
        )
    } catch (error) {
        return NextResponse.json({
            message:'Failed to delete course..',
            error
        },{
            status:500
        }
        )
    }
}