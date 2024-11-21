import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskLogsDto {
  @ApiProperty({ description: 'The name of the task' })
  taskId: number;
  @ApiProperty({ description: 'The command in task' })
  run_date: Date;

}
