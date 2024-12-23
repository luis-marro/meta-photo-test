import { Request, Response } from "express"

export class HomeController {
  // This would be better managed as a view in the project, but because of time constraints and the goal being to only show a homepage, this suffices.
    static async homepage(req: Request, res: Response): Promise<void> {
        const formattedResponse = `
          <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome</title>
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  font-family: Arial, sans-serif;
                  background: linear-gradient(135deg, #4CAF50, #2196F3);
                  color: white;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  text-align: center;
                }

                .container {
                  max-width: 600px;
                  padding: 20px;
                  border-radius: 8px;
                  background-color: rgba(0, 0, 0, 0.5);
                  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                }

                h1 {
                  margin-bottom: 16px;
                  font-size: 2.5em;
                }

                p {
                  margin-top: 0;
                  font-size: 1.2em;
                  line-height: 1.6;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Welcome to MetaPhoto API</h1>
                <p>
                  Please feel free to test out the routes from the specifications.<br>
                  You can start browsing the use cases at /api/externalapi/photos/ <br>
                  Reach out if you have question or want to have a follow-up meeting ;)
                </p>
              </div>
            </body>
            </html>
        `
        res.send(formattedResponse)
    }
}