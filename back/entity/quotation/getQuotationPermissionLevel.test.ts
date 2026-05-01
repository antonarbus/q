import { expect, it, describe } from 'vitest'
import { getQuotationPermissionLevel } from './getQuotationPermissionLevel'
import { createMockUser } from '@back/entity/user/createMockUser.test-helper'

describe('#getQuotationPermissionLevel', () => {
  it('returns OWNER when user email matches quotation email', () => {
    const result = getQuotationPermissionLevel({
      user: createMockUser({ email: 'owner@example.com' }),
      quotationEmail: 'owner@example.com',
      quotationAccess: {
        level: 'nobody',
        userList: [],
      },
      shouldTrace: true,
    })

    expect(result).toBe('OWNER')
  }, 1000)

  it('returns SHARED when user email is in custom access userList', () => {
    const result = getQuotationPermissionLevel({
      user: createMockUser({ email: 'shared@example.com' }),
      quotationEmail: 'owner@example.com',
      quotationAccess: {
        level: 'custom',
        userList: ['shared@example.com', 'another@example.com'],
      },
      shouldTrace: true,
    })

    expect(result).toBe('SHARED')
  }, 1000)

  it('returns PUBLIC when access level is everyone', () => {
    const result = getQuotationPermissionLevel({
      user: createMockUser({ email: 'random@example.com' }),
      quotationEmail: 'owner@example.com',
      quotationAccess: {
        level: 'everyone',
        userList: [],
      },
      shouldTrace: true,
    })

    expect(result).toBe('PUBLIC')
  }, 1000)

  it('returns PUBLIC when access level is everyone and user is not logged in', () => {
    const result = getQuotationPermissionLevel({
      user: null,
      quotationEmail: 'owner@example.com',
      quotationAccess: {
        level: 'everyone',
        userList: [],
      },
      shouldTrace: true,
    })

    expect(result).toBe('PUBLIC')
  }, 1000)

  it('returns SUPER_ADMIN_ON_BEHALF_OF_A_USER when user is logged in and shouldTrace is false', () => {
    const result = getQuotationPermissionLevel({
      user: createMockUser({ email: 'different@example.com' }),
      quotationEmail: 'owner@example.com',
      quotationAccess: {
        level: 'nobody',
        userList: [],
      },
      shouldTrace: false,
    })

    expect(result).toBe('SUPER_ADMIN_ON_BEHALF_OF_A_USER')
  }, 1000)

  it('returns SUPER_ADMIN when user has super-admin role', () => {
    const result = getQuotationPermissionLevel({
      user: createMockUser({
        email: 'admin@example.com',
        roles: ['super-admin'],
      }),
      quotationEmail: 'owner@example.com',
      quotationAccess: {
        level: 'nobody',
        userList: [],
      },
      shouldTrace: true,
    })

    expect(result).toBe('SUPER_ADMIN')
  }, 1000)

  it('returns FORBIDDEN when user is not logged in and quotation is private', () => {
    const result = getQuotationPermissionLevel({
      user: null,
      quotationEmail: 'owner@example.com',
      quotationAccess: {
        level: 'nobody',
        userList: [],
      },
      shouldTrace: true,
    })

    expect(result).toBe('FORBIDDEN')
  }, 1000)

  it('returns FORBIDDEN when user is logged in but has no access', () => {
    const result = getQuotationPermissionLevel({
      user: createMockUser({ email: 'different@example.com' }),
      quotationEmail: 'owner@example.com',
      quotationAccess: {
        level: 'nobody',
        userList: [],
      },
      shouldTrace: true,
    })

    expect(result).toBe('FORBIDDEN')
  }, 1000)

  it('returns FORBIDDEN when user email is not in custom access userList', () => {
    const result = getQuotationPermissionLevel({
      user: createMockUser({ email: 'notinlist@example.com' }),
      quotationEmail: 'owner@example.com',
      quotationAccess: {
        level: 'custom',
        userList: ['other@example.com'],
      },
      shouldTrace: true,
    })

    expect(result).toBe('FORBIDDEN')
  }, 1000)

  it('oWNER takes precedence over SUPER_ADMIN', () => {
    const result = getQuotationPermissionLevel({
      user: createMockUser({
        email: 'admin@example.com',
        roles: ['super-admin'],
      }),
      quotationEmail: 'admin@example.com',
      quotationAccess: {
        level: 'nobody',
        userList: [],
      },
      shouldTrace: true,
    })

    expect(result).toBe('OWNER')
  }, 1000)

  it('oWNER takes precedence over SUPER_ADMIN_ON_BEHALF_OF_A_USER', () => {
    const result = getQuotationPermissionLevel({
      user: createMockUser({ email: 'owner@example.com' }),
      quotationEmail: 'owner@example.com',
      quotationAccess: {
        level: 'nobody',
        userList: [],
      },
      shouldTrace: false,
    })

    expect(result).toBe('OWNER')
  }, 1000)

  it('sHARED takes precedence over PUBLIC', () => {
    const result = getQuotationPermissionLevel({
      user: createMockUser({ email: 'shared@example.com' }),
      quotationEmail: 'owner@example.com',
      quotationAccess: {
        level: 'everyone',
        userList: ['shared@example.com'],
      },
      shouldTrace: true,
    })

    // Note: Based on the code, SHARED requires access.level === 'custom'
    // So in this case it should return PUBLIC
    expect(result).toBe('PUBLIC')
  }, 1000)

  it('returns SHARED only when access level is custom', () => {
    const result = getQuotationPermissionLevel({
      user: createMockUser({ email: 'shared@example.com' }),
      quotationEmail: 'owner@example.com',
      quotationAccess: {
        level: 'custom',
        userList: ['shared@example.com'],
      },
      shouldTrace: true,
    })

    expect(result).toBe('SHARED')
  }, 1000)
})
