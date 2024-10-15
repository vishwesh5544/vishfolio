import { NextResponse } from 'next/server';
import { ProjectService } from '@/services';
import { getErrorMessage } from '@/utils';  // Custom error handler

const projectService = new ProjectService();

// GET: Fetch all projects
export async function GET() {
  try {
    const projects = await projectService.find();
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json({ message: 'Internal Server Error', error: errorMessage }, { status: 500 });
  }
}

// POST: Create a new project or a batch of projects
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // If the body is an array, create a batch of projects
    if (Array.isArray(body)) {
      const newProjects = await projectService.createBatch(body);
      return NextResponse.json(newProjects, { status: 201 });
    } else {
      // Otherwise, create a single project
      const newProject = await projectService.create(body);
      return NextResponse.json(newProject, { status: 201 });
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json({ message: 'Internal Server Error', error: errorMessage }, { status: 500 });
  }
}

// PUT: Update a batch of projects or a single project
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    // If the body is an array, update a batch of projects
    if (Array.isArray(body)) {
      const updatedProjects = await projectService.updateBatch(body);
      return NextResponse.json(updatedProjects, { status: 200 });
    } else {
      // Otherwise, update a single project (id must be provided in the request body)
      const { id, ...updateData } = body;
      const updatedProject = await projectService.update(id, updateData);
      if (!updatedProject) {
        return NextResponse.json({ message: 'Project not found' }, { status: 404 });
      }
      return NextResponse.json(updatedProject, { status: 200 });
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json({ message: 'Internal Server Error', error: errorMessage }, { status: 500 });
  }
}

// DELETE: Delete a batch of projects or a single project
export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    // If the body contains an array of IDs, delete multiple projects
    if (Array.isArray(body.ids)) {
      const deletedResults = await projectService.deleteBatch(body.ids);
      return NextResponse.json(deletedResults, { status: 200 });
    } else {
      // Otherwise, delete a single project (id must be provided in the request body)
      const { id } = body;
      const deleted = await projectService.delete(id);
      if (!deleted) {
        return NextResponse.json({ message: 'Project not found' }, { status: 404 });
      }
      return NextResponse.json(null, { status: 204 });
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json({ message: 'Internal Server Error', error: errorMessage }, { status: 500 });
  }
}
