import { NextRequest, NextResponse } from 'next/server';
import { request } from './request';


export async function signup(req: NextRequest) {
  return request(req, {
    endpoint: '/api/auth/signup',
    method: 'POST',
    includeBody: true,
  });
}

export async function login(req: NextRequest) {
  return request(req, {
    endpoint: '/api/auth/login',
    method: 'POST',
    includeBody: true,
  });
}

export async function logout(req: NextRequest) {
  return request(req, {
    endpoint: '/api/auth/logout',
    method: 'POST',
    clearCookie: true,
  });
}

export async function me(req: NextRequest) {
  return request(req, {
    endpoint: '/api/auth/me',
    method: 'GET',
    requireAuth: true,
  });
}


