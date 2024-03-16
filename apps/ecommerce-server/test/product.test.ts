import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../app';
import models from '../models';
import { ProductAttributes } from '../models/product';

const { User, Product } = models;

let user = { email: 'alex@gmail.com', password: 'alexsecret', role: 'user' };
let admin = {
  email: 'admin@gmail.com',
  password: 'adminsecret',
  role: 'admin',
};

let access_token = '';
let access_token_admin = '';
let product = {
  name: 'Iron Man Movie',
  description: 'This is description',
  image_url: 'http://example.com/image.jpg',
  price: 50_000,
  stock: 5,
};
let productData = {} as ProductAttributes;

beforeAll(async () => {
  try {
    await User.create(user);
    await User.create(admin);
    productData = await Product.create(product);

    access_token = await request(app)
      .post('/login')
      .send(user)
      .expect(200)
      .then(res => res.body.user.access_token);

    access_token_admin = await request(app)
      .post('/login')
      .send(admin)
      .expect(200)
      .then(res => res.body.user.access_token);
  } catch (e) {
    throw e;
  }
});

describe('Products - Success', () => {
  test('Should send product array - (GET)', () => {
    return request(app)
      .get('/products')
      .set('access_token', access_token)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              description: expect.any(String),
              image_url: expect.any(String),
              price: expect.any(Number),
              stock: expect.any(Number),
            }),
          ])
        );
      });
  });

  test('Should send msg & created product object - (POST)', () => {
    return request(app)
      .post('/products')
      .set('access_token', access_token_admin)
      .send(product)
      .expect(201)
      .then(res => {
        expect(res.body.msg).toBe('product successfully created');
        expect(res.body.product).toEqual(expect.objectContaining(product));
      });
  });

  let updateProductData = {
    name: 'Iron Man',
    description: 'This is description now',
    image_url: 'http://example.com/imagev2.jpg',
    price: 60000,
    stock: 10,
  };

  test('Should send msg & updated product object - (PUT)', () => {
    return request(app)
      .put('/products/' + productData.id)
      .set('access_token', access_token_admin)
      .send(updateProductData)
      .expect(200)
      .then(res => {
        console.log('Product updated:', res.body);
        expect(res.body.msg).toEqual('product successfully updated');
        expect(res.body.product).toEqual(
          expect.objectContaining(updateProductData)
        );
      });
  });

  test('Should send msg & deleted product object - (DELETE)', () => {
    return request(app)
      .delete('/products/' + productData.id)
      .set('access_token', access_token_admin)
      .expect(200)
      .then(res => {
        expect(res.body.msg).toEqual('product successfully deleted');
        expect(res.body.product).toEqual(
          expect.objectContaining(updateProductData)
        );
      });
  });
});

describe('Products Create - Failed', () => {
  test('Should send invalid "Authentication failed" - (No access_token)', () => {
    return request(app)
      .post('/products')
      .send(product)
      .expect(401)
      .then(res => {
        console.log('Products Create Response:', res.body.errors);
        expect(res.body.errors).toEqual(
          expect.arrayContaining([expect.stringContaining('Invalid user')])
        );
      });
  });

  test('Should send invalid "Authentication failed" - (access_token not admin)', () => {
    return request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(product)
      .expect(401)
      .then(res => {
        expect(res.body.errors).toEqual(
          expect.arrayContaining([
            expect.stringContaining("User doesn't have permission"),
          ])
        );
      });
  });

  test('Should send invalid "Validation errors" - (required field not filled)', () => {
    return request(app)
      .post('/products')
      .set('access_token', access_token_admin)
      .send({})
      .expect(400)
      .then(res => {
        let errors = [
          'Name is required',
          'Image url is required',
          'Price is required',
          'Stock is required',
        ];

        expect(res.body.errors).toEqual(errors);
      });
  });

  test('Should send invalid "Validation errors" - (stock & price can\'t be negative)', () => {
    return request(app)
      .post('/products')
      .set('access_token', access_token_admin)
      .send({
        name: 'Captain Marvel',
        description: 'This is marvel description',
        image_url: 'http://example.com/imagev3.jpg',
        price: -60000,
        stock: -10,
      })
      .expect(400)
      .then(res => {
        let errors = [
          "Price value can't be negative",
          "Stock value can't be negative",
        ];

        expect(res.body.errors).toEqual(errors);
      });
  });

  test('Should send invalid "Validation errors" - (stock & price must be number)', () => {
    return request(app)
      .post('/products')
      .set('access_token', access_token_admin)
      .send({
        name: 'Captain Marvel',
        description: 'This is marvel description',
        image_url: 'http://example.com/imagev3.jpg',
        price: 'test',
        stock: 'test',
      })
      .expect(400)
      .then(res => {
        let errors = [
          'Price value must be number',
          'Stock value must be number',
        ];

        expect(res.body.errors).toEqual(errors);
      });
  });
});

describe('Products Update - Failed', () => {
  test('Should send invalid "Authentication failed" - (No access_token)', () => {
    return request(app)
      .put('/products')
      .send(product)
      .expect(401)
      .then(res => {
        expect(res.body.errors).toEqual(
          expect.arrayContaining([expect.stringContaining('Invalid user')])
        );
      });
  });

  test('Should send invalid "Authentication failed" - (access_token not admin)', () => {
    return request(app)
      .put('/products/' + productData.id)
      .set('access_token', access_token)
      .send(product)
      .expect(401)
      .then(res => {
        expect(res.body.errors).toEqual(
          expect.arrayContaining([
            expect.stringContaining("User doesn't have permission"),
          ])
        );
      });
  });

  test('Should send invalid "Validation errors" - (stock & price can\'t be negative)', async () => {
    try {
      const productData = await Product.create(product);
      const response = await request(app)
        .put('/products/' + productData.id)
        .set('access_token', access_token_admin)
        .send({
          ...productData,
          price: -60_000,
          stock: -10,
        });

      let errors = [
        "Price value can't be negative",
        "Stock value can't be negative",
      ];

      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toEqual(errors);
    } catch (error) {
      throw error;
    }
  });

  test('Should send invalid "Validation errors" - (stock & price must be number)', async () => {
    try {
      const productData = await Product.create(product);
      const response = await request(app)
        .put('/products/' + productData.id)
        .set('access_token', access_token_admin)
        .send({
          ...productData,
          price: 'test',
          stock: 'test',
        });

      let errors = ['Price value must be number', 'Stock value must be number'];

      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toEqual(errors);
    } catch (error) {
      throw error;
    }
  });
});

describe('Products Delete - Failed', () => {
  test('Should send invalid "Authentication failed" - (No access_token)', () => {
    return request(app)
      .delete('/products')
      .send(product)
      .expect(401)
      .then(res => {
        expect(res.body.errors).toEqual(
          expect.arrayContaining([
            expect.stringContaining('Invalid user session'),
          ])
        );
      });
  });

  test('Should send invalid "Authentication failed" - (access_token not admin)', () => {
    return request(app)
      .delete('/products/' + productData.id)
      .set('access_token', access_token)
      .send(product)
      .expect(401)
      .then(res => {
        expect(res.body.errors).toEqual(
          expect.arrayContaining([
            expect.stringContaining("User doesn't have permission"),
          ])
        );
      });
  });
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
  await Product.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
