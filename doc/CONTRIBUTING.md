# Contributing

Thank you for your interest in contributing to this portfolio project! This document provides guidelines for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Code Standards](#code-standards)

---

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the project

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal attacks
- Publishing others' private information

---

## How to Contribute

### Ways to Contribute

1. **Report Bugs**
   - Use GitHub Issues
   - Provide detailed information
   - Include steps to reproduce

2. **Suggest Features**
   - Open a feature request
   - Explain the use case
   - Discuss implementation

3. **Submit Code**
   - Fix bugs
   - Add features
   - Improve documentation
   - Optimize performance

4. **Improve Documentation**
   - Fix typos
   - Add examples
   - Clarify instructions
   - Update outdated info

---

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm
- Git
- Code editor

### Setup Steps

1. **Fork the repository**
   - Click "Fork" on GitHub
   - Clone your fork

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Create branch**

   ```bash
   git checkout -b feature/your-feature
   ```

4. **Make changes**
   - Write code
   - Test locally
   - Follow code standards

5. **Commit changes**

   ```bash
   git add .
   git commit -m "feat: add feature"
   ```

6. **Push to fork**

   ```bash
   git push origin feature/your-feature
   ```

7. **Create Pull Request**
   - Go to original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out PR template

For detailed setup, see [Development Workflow](./DEVELOPMENT_WORKFLOW.md).

---

## Pull Request Process

### Before Submitting

- [ ] Code follows style guide
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] No console errors
- [ ] Responsive design tested
- [ ] Accessibility checked

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring
- [ ] Performance improvement

## Testing

How was this tested?

## Screenshots (if applicable)

Add screenshots here

## Checklist

- [ ] Code follows style guide
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
```

### Review Process

1. **Automated Checks**
   - Linting
   - Type checking
   - Build verification

2. **Code Review**
   - Maintainer reviews
   - Feedback provided
   - Changes requested if needed

3. **Approval**
   - Changes approved
   - PR merged
   - Branch deleted

---

## Issue Reporting

### Bug Reports

**Template**:

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:

1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment**

- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]

**Additional context**
Any other relevant information
```

### Feature Requests

**Template**:

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
What you want to happen

**Describe alternatives considered**
Other solutions you've considered

**Additional context**
Any other relevant information
```

---

## Code Standards

### TypeScript

- Use explicit types
- Avoid `any`
- Use interfaces for objects
- Type all function parameters

### React

- Functional components
- Named exports
- Type all props
- Use hooks properly

### Styling

- Tailwind CSS only
- Use CSS variables
- Mobile-first
- Consistent spacing

### File Organization

- One component per file
- Co-locate related files
- Use index files
- Group by feature

For detailed standards, see [Style Guide](./STYLE_GUIDE.md).

---

## Documentation

### Updating Documentation

- Keep docs up to date
- Add examples
- Fix typos
- Clarify instructions

### Documentation Files

- `README.md` - Project overview
- `doc/` - Detailed documentation
- Code comments - Complex logic

---

## Testing

### Manual Testing

Test your changes:

- [ ] All pages load
- [ ] Navigation works
- [ ] Forms submit
- [ ] Responsive design
- [ ] No console errors

### Browser Testing

Test in:

- Chrome/Edge
- Firefox
- Safari
- Mobile browsers

---

## Questions?

If you have questions:

- Open a discussion on GitHub
- Check existing issues
- Review documentation
- Ask in PR comments

---

## Recognition

Contributors will be:

- Listed in README (if desired)
- Credited in commit history
- Appreciated by the community

---

## Summary

Contributing process:

1. ✅ Fork repository
2. ✅ Create branch
3. ✅ Make changes
4. ✅ Test locally
5. ✅ Submit PR
6. ✅ Address feedback
7. ✅ Get merged

Thank you for contributing! 🎉

For more information:

- [Development Workflow](./DEVELOPMENT_WORKFLOW.md)
- [Style Guide](./STYLE_GUIDE.md)
- [AI Training Guide](./AI_TRAINING_GUIDE.md)
