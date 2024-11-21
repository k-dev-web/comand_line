import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { TasksEntity } from './entity/tasks.entity';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
    type: TasksEntity,
  })
  create(@Body() createTaskDto: CreateTaskDto): Promise<TasksEntity> {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'Return all tasks.',
    type: [TasksEntity],
  })
  findAll(): Promise<TasksEntity[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the task.',
    type: TasksEntity,
  })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  findOne(@Param('id') id: number): Promise<TasksEntity> {
    return this.taskService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  remove(@Param('id') id: number): Promise<void> {
    return this.taskService.remove(id);
  }
}
