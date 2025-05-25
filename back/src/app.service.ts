import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              background-image: url('https://i.ibb.co/4Z93Txwt/ai-generated-8185136-1920.png');
              background-size: cover;
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            .container {
              background-color: white;
              border-radius: 8px;
              padding: 20px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              text-align: center;
            }
            h1 {
              color: #2c3e50;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>P10 API - NestJs 🚀</h1>
            <p>Lien documentation Swagger : <a href="/api">Swagger</a></p>
            <p>Lien vers Apollo GraphQL : <a href="/graphql">GraphQL</a></p>
            <br/>
            <p>Pour toute question, contactez-nous : <a href="mailto:remi.moul@my-digital-school.org">remi.moul@my-digital-school.org</a></p>
          </div>
        </body>
      </html>
    `;
  }
}
