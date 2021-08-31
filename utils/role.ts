const translateRoleString = (role: string): string => {
  switch (role) {
    case 'Admin':
      return '管理者'
    case 'General':
      return 'メンバー'
    default:
      return ''
  }
}

export { translateRoleString }
