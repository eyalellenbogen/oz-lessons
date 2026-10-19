import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsOptional, IsString, Matches, Max, Min } from 'class-validator';

export class QuizQueryDto {
  /** Comma-separated topic ids. Omit for all topics. */
  @IsOptional()
  @IsString()
  @Matches(/^[a-z]+(,[a-z]+)*$/)
  topics?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(60)
  count?: number;
}

export class CheckAnswerDto {
  @IsString()
  @Matches(/^[a-z]+-\d{3}$/)
  questionId: string;

  /** number for 'choice', number[] for 'multi' and 'equation'. Shape is validated per question type. */
  @IsDefined()
  answer: unknown;
}
