import { ArrayMaxSize, ArrayMinSize, IsArray, IsInt, IsString, Matches, Max, Min } from 'class-validator';

const FORMULA = /^[A-Za-z0-9()]{1,30}$/;

export class AnalyzeEquationDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsString({ each: true })
  @Matches(FORMULA, { each: true })
  reactants: string[];

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsString({ each: true })
  @Matches(FORMULA, { each: true })
  products: string[];

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(10)
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(99, { each: true })
  coefficients: number[];
}
