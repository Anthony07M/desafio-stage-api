import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ERRORS_PRISMA } from '../errors.messages';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const error = ERRORS_PRISMA[exception.code](
      exception.meta && exception.meta.target,
    );

    response.status(error.status).json({
      message: error.message,
    });
  }
}
