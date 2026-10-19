import { Body, Controller, Post } from '@nestjs/common';
import { AnalyzeEquationDto } from './dto/analyze-equation.dto';
import { EquationsService } from './equations.service';

@Controller('equations')
export class EquationsController {
  constructor(private readonly equations: EquationsService) {}

  @Post('analyze')
  analyze(@Body() dto: AnalyzeEquationDto) {
    return this.equations.analyze(dto.reactants, dto.products, dto.coefficients);
  }
}
