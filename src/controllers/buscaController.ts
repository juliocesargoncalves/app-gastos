import { Request, Response } from 'express';
import { BuscaService } from '../services/buscaService';

class BuscaController {
   
    async busca(req: Request, res: Response) {

        const buscaService = new BuscaService();

        const resultado = await buscaService.buscarDados();

        res.json(resultado);
    }
    
}
export { BuscaController }