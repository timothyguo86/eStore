# eStore Project Guidelines

This document provides essential information for developers working on the eStore project.

## Build/Configuration Instructions

### Angular Frontend (eStore-angular)

1. **Prerequisites**:
   - Node.js (v18+ recommended)
   - npm (v9+ recommended)

2. **Installation**:
   ```bash
   cd eStore-angular
   npm install
   ```

3. **Development Server**:
   ```bash
   npm start
   ```
   This will start the Angular development server at http://localhost:4200

4. **Production Build**:
   ```bash
   npm run build
   ```
   The build artifacts will be stored in the `dist/estore` directory.

### Node.js Backend (eStore-server)

1. **Prerequisites**:
   - Node.js (v16+ recommended)
   - MySQL database

2. **Installation**:
   ```bash
   cd eStore-server
   npm install
   ```

3. **Database Configuration**:
   - The server uses MySQL. Configure your database connection in `shared/pool.js`.

4. **Starting the Server**:
   ```bash
   node index.js
   ```
   The server will run on port 5001 (http://localhost:5001).

## Testing Information

### Angular Testing

1. **Running Tests**:
   ```bash
   cd eStore-angular
   npm test
   ```
   This will execute the unit tests via Karma in a Chrome browser.

2. **Test Structure**:
   - Tests are written using Jasmine and are located in `.spec.ts` files alongside the components they test.
   - Example: `app.component.spec.ts` tests `app.component.ts`.

3. **Creating New Tests**:
   - Create a new file with the `.spec.ts` extension next to the file you want to test.
   - Follow the pattern in existing tests:
     ```typescript
     import { ComponentFixture, TestBed } from '@angular/core/testing';
     import { YourComponent } from './your.component';

     describe('YourComponent', () => {
       let component: YourComponent;
       let fixture: ComponentFixture<YourComponent>;

       beforeEach(async () => {
         await TestBed.configureTestingModule({
           imports: [/* required modules */],
           providers: [/* required services */]
         }).compileComponents();

         fixture = TestBed.createComponent(YourComponent);
         component = fixture.componentInstance;
         fixture.detectChanges();
       });

       it('should create', () => {
         expect(component).toBeTruthy();
       });

       // Additional test cases
     });
     ```

4. **Testing Services**:
   - For services, use TestBed to configure the testing module with necessary dependencies.
   - Mock external dependencies using jasmine spies or mock classes.

### Backend Testing

Currently, the backend doesn't have a configured testing framework. When implementing tests:

1. Consider using Jest or Mocha with Chai for API testing.
2. Create a separate test database configuration to avoid affecting production data.
3. Implement tests for each route in separate files matching the route structure.

## Angular Development Resources

Here are some links to the essentials for building Angular applications:
- https://angular.dev/essentials/components
- https://angular.dev/essentials/signals
- https://angular.dev/essentials/templates
- https://angular.dev/essentials/dependency-injection

## Best practices & Style guide

Here are the best practices and the style guide information.

### Coding Style guide

Here is a link to the most recent Angular style guide https://angular.dev/style-guide

### TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

### Angular Best Practices

- Always use standalone components over `NgModules`
- Don't use explicit `standalone: true` (it is implied by default)
- Use signals for state management
- Implement lazy loading for feature routes
- Use `NgOptimizedImage` for all static images.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` signal instead of decorators, learn more here https://angular.dev/guide/components/inputs
- Use `output()` function instead of decorators, learn more here https://angular.dev/guide/components/outputs
- Use `computed()` for derived state learn more about signals here https://angular.dev/guide/signals.
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead, for
  context: https://angular.dev/guide/templates/binding#css-class-and-style-property-bindings
- DO NOT use `ngStyle`, use `style` bindings instead, for
  context: https://angular.dev/guide/templates/binding#css-class-and-style-property-bindings

### State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable

### Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Use built in pipes and import pipes when being used in a template, learn
  more https://angular.dev/guide/templates/pipes#

### Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
