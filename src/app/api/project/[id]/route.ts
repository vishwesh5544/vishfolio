import { NextResponse } from 'next/server';
import { ProjectService } from '@/services';
import { getErrorMessage } from '@/utils';  // Import your custom error handler

const projectService = new ProjectService();

// GET: Fetch a single project by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const project = await projectService.findOne(params.id);
    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json({ message: 'Internal Server Error', error: errorMessage }, { status: 500 });
  }
}

// PUT: Update a project by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updatedProject = await projectService.update(params.id, body);
    if (!updatedProject) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json({ message: 'Internal Server Error', error: errorMessage }, { status: 500 });
  }
}

// DELETE: Delete a project by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const deleted = await projectService.delete(params.id);
    if (!deleted) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json({ message: 'Internal Server Error', error: errorMessage }, { status: 500 });
  }
}
