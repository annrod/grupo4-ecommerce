import server from "../server";
import { errorHandler, notFound } from "./errorMiddleware";

server.get(config.api.prefix, (req,res)=>{
    res.send('API is running..!');
})

server.use(notFound)
server.use(errorHandler)

export default server;