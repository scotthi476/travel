//Reference https://dev.to/qbentil/effective-unit-testing-for-rest-apis-with-nodejs-typescript-2e4o
//Reference https://jestjs.io/docs/mock-functions

const request = require('supertest');
const pool = require('../config/database.js');
const app = require('../appTest.js');

//This code mocks the implementation in database.js
jest.mock('../config/database.js', () => ({
  query: jest.fn(),
}));

//This code creates mock data
const mockTrips = [
  { id: 1, title: 'Boston Trip' },
  { id: 2, title: 'Arizona Trip' },
];

//Unit Test using Jtest
describe('Trip API Test', () => {
  describe('GET /api/Trips', () => {
    it('Return trips', async () => {
      pool.query.mockResolvedValue({rows: mockTrips });
      const response = await request(app).get('/api/trips');
      expect(response.status).toBe(200);  //get response 200
      expect(response.body).toEqual(mockTrips);
    });
  });

  describe('POST /api/trips/', () => {
    it('Add new trip', async () => {
      const newTrip = { id: 3, title: 'New York Trip' }
      pool.query.mockResolvedValue({rows: [newTrip]});
      const response = await request(app)
           .post('/api/trips').send(newTrip)      
      expect(response.status).toBe(201);  //post response 201
      expect(response.body).toEqual(newTrip);
     });
   });
});