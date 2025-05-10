import { mock } from 'jest-mock-extended';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { LoadProductsUseCase } from './load-products.usecase';
import axios from 'axios';

// * Creamos un mock de axios, para interceptar las llamadas HTTP
// * jest.mock('axios) -> Le dice a Jest: Intercepta el módulo real de Axios
// * y convierte todos sus métodos en mocks automáticos
// * Después de esto si tu haces: axios.get('/some/url'); No se ejecutará realmente,
// * sino que será una función espía (mock)
jest.mock('axios');

// * Aunque jest ha mockeado internamente Axios,
// * TypeScript no sabe todavía que los métodos (como get )ahora son mocks
// * si ejecutamos: mockedAxios.get.mockResolvedValue(...) sin l alinea de abajo,
// * typeScript nos indicará que no reconoce la función "mockResolvedValue"
// * Con el cast: le decimos a TypeScript, trata a axios(mockeado por jest) como un mock completo(para no dar error TS)
// * Resumen: Jest mockea la funcionalidad real.
// * El cast ajusta el tipado para que TS sepa que ahora es un mock
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('load-products.usecase', () => {
  // * Creamos un mock del repositorio, con todos sus métodos simulados
  // * ¿Que es mock? Lo usamos cuando el tipo que queremos mockear no tiene propiedades anidadas con
  // * métodos, sino que solo tiene métodos directamente en su interfaz.
  // * con mock simple basta porque Jest solo necesita simular los métodos principales
  const productRepositoryMock = mock<ProductRepository>();

  const useCase = new LoadProductsUseCase(productRepositoryMock);

  test('should fetch products and save them', async () => {
    // * 1) Simulamos la respuesta de la API. Devolvemos un producto simulado cuando se llama a la API
    mockedAxios.get.mockResolvedValue({
      data: {
        products: [
          {
            id: 1,
            title: 'Test Product',
            description: 'A description',
            category: 'Test Category',
            price: 99.99,
            stock: 10,
            thumbnail: 'thumb.jpg',
            images: ['img1.jpg'],
          },
        ],
      },
    });
    // * ejecutamos la petición
    // * Esto llama a la API(mock) y luego guarda cada producto con repository.save()
    await useCase.execute();

    // * 2) Verificamos que el repositorio guardó el producto
    // * Comprobamos que el método fue llamado con una entidad que contiene el id y title correctos
    expect(productRepositoryMock.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        title: 'Test Product',
      })
    );
  });
});
