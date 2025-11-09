import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrometheusService } from '../prometheus.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class PrometheusGraphqlInterceptor implements NestInterceptor {
  constructor(private prometheusService: PrometheusService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Vérifier si c'est une requête GraphQL
    if ((context.getType() as string) !== 'graphql') {
      return next.handle();
    }

    const start = Date.now();
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo();

    // Extraire le nom de l'opération et le type
    const operationName = info?.operation?.name?.value || 'unknown';
    const operationType = info?.operation?.operation || 'unknown';

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - start;
          this.prometheusService.recordGraphqlRequestDuration(
            operationName,
            operationType,
            duration,
          );
        },
        error: (error) => {
          this.prometheusService.recordGraphqlError(
            operationName,
            operationType,
          );
        },
      }),
    );
  }
}
