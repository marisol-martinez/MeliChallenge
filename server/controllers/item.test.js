const ValidaItem = require('./item')

describe('getItemById', () => {
    test('getItemById null => status 400', async () => {
        const req = {
            params: {
                id:null
            }
        }
      const resultado = await ValidaItem.getItemById(req);
      expect(resultado.statusCode).toEqual(400);
    });


    test('getItemById NoExiste => status 500', async () => {
        const req = {
            params: {
                id:'NoExiste'
            }
        }
      const resultado = await ValidaItem.getItemById(req);
      expect(resultado.statusCode).toEqual(500);
    });
  });

  describe('getItems', () => {
    test('getItems null => status 400', async () => {
        const req = {
            query: {
                q:null
            }
        }
      const resultado = await ValidaItem.getItems(req);
      expect(resultado.statusCode).toEqual(400);
    });


    test('getItems NoExiste => status 500', async () => {
        const req = {
            query: {
                q:'NoExiste'
            }
        }
      const resultado = await ValidaItem.getItems(req);
      expect(resultado.statusCode).toEqual(500);
    });
  });