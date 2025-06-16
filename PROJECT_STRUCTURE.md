# Project Structure

This document outlines the organization and coding conventions for the Dashboard Example project.

## Table of Contents
- [Class Structure](#class-structure)
  - [Element Order](#element-order)
  - [Example Class](#example-class)
  - [Naming Conventions](#naming-conventions)
- [Project Organization](#project-organization)
  - [Core Module](#core-module)
  - [Feature Modules](#feature-modules)
  - [Shared Module](#shared-module)
  - [API Clients](#api-clients)
  - [Styling Structure](#styling-structure)

## Class Structure

### Element Order

Classes should follow this specific ordering of elements:

1. **Injected Dependencies** (as class properties with the `@inject()` decorator)
2. **Service-Extracted Variables** (variables that are extracted from other services)
   - Example: `readonly $tasks = this.workQueueService.$filteredTasks;`
3. **Signals**
   - Input signals
   - Model signals
   - Regular signals
   - Computed signals
4. **Observables** (RxJS streams)
5. **Standard Variables** (primitive values, objects, etc.)
6. **Constructor**
7. **Getters/Setters**
8. **Lifecycle Hooks** (ngOnInit, ngOnDestroy, etc.)
9. **Public Methods**
10. **Private Methods**

### Example Class

```typescript
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  // 1. Injected Dependencies
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly taskService = inject(TaskService);

  // 2. Service-Extracted Variables
  readonly $currentUser = this.authService.$currentUser;
  readonly $categories = this.lookupService.$taskCategories;

  // 3. Signals
  $projectId = input.required<string>(); // input signal
  $tasks = signal<Task[]>([]); // regular signal
  $model = formModel({ // model signal
    filter: [''],
    sortBy: ['createdAt']
  });
  $filteredTasks = computed(() => { // computed signal
    const filter = this.$model.filter();
    return this.$tasks().filter(task => 
      task.title.toLowerCase().includes(filter.toLowerCase())
    );
  });

  // 4. Observables
  searchTerms$ = new Subject<string>();
  searchResults$ = this.searchTerms$.pipe(
    debounceTime(300),
    switchMap(term => this.taskService.searchTasks$(term))
  );

  // 5. Standard Variables
  isLoading = false;
  currentPage = 1;
  pageSize = 20;
  
  // 6. Constructor
  constructor() {
    // Minimal constructor usage - prefer inject() for dependencies
  }
  
  // 7. Getters/Setters
  get hasActiveTasks(): boolean {
    return this.$filteredTasks().some(task => task.status === 'active');
  }
  
  // 8. Lifecycle Hooks
  ngOnInit(): void {
    this.loadTasks();
    
    this.searchResults$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(results => {
        this.$tasks.set(results);
      });
  }
  
  ngOnDestroy(): void {
    // Resources cleanup if needed
  }
  
  // 9. Public Methods
  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getTasks$(this.$projectId())
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: tasks => this.$tasks.set(tasks),
        error: error => this.handleError(error)
      });
  }
  
  createTask(): void {
    const dialogRef = this.dialog.open(TaskFormDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    });
  }
  
  // 10. Private Methods
  private handleError(error: any): void {
    console.error('An error occurred loading tasks', error);
    // Additional error handling
  }
}
```

### Naming Conventions

1. **Signal naming**: All signals must be named with a $ prefix
   - Input signals: `$name = input<string>('Default');`
   - Regular signals: `$isLoading = signal<boolean>(false);`
   - Computed signals: `$filteredItems = computed(() => {...});`

2. **Observable naming**: All observables must end with a $ suffix
   - `searchResults$ = this.service.search(term);`
   - `items$ = this.http.get<Item[]>('/api/items');`

## Project Organization

The project follows a modular architecture with clear separation of concerns.

### Core Module

Located at `src/app/core/`, this module contains:

- **Models** - Core data interfaces and types
- **API** - HTTP clients for data access organized by domain
- **States** - Global state management stores
- **Interceptors** - HTTP request/response interceptors
- **Services** - Application-wide singleton services

Core components should only be imported in the AppModule to avoid circular dependencies.

### Feature Modules

Located at `src/app/features/`, each feature module represents a distinct functional area of the application.

Each feature follows a consistent organization pattern:

```
features/
└── feature-name/
    ├── view/
    │   ├── pages/ - Container components that represent routes
    │   └── components/ - Feature-specific UI components that support the pages
    ├── data-access/ - Feature-specific state management, services, and models
    │   ├── services/ - Business logic services
    │   ├── store/ - Local state management (if applicable)
    │   └── models/ - Feature-specific interfaces and types
    └── feature-name.routes.ts - Feature routing (if multiple routes exist)
```

This structure creates clear boundaries between:
- Presentational concerns (view layer)
- Business logic and data structures (data-access layer)

**Routing**:
- If a feature has multiple routes, create a `.routes.ts` file
- If a feature has only one route, define the route directly in the component

**Data-Access Structure**:
Based on the dashboard example:
- **services/**: Contains business logic services that interact with APIs and transform data
- **store/**: Contains signal-based state management (e.g., using NgRx signals store)
- **models/**: Contains feature-specific interfaces and types
- **api/**: Optional sub-folder for feature-specific API clients if not in core

Each feature can operate mostly independently, facilitating better scaling and maintenance.

### Shared Module

Located at `src/app/shared/`, this module contains:

- **Components**: Reusable UI elements used across features
  - status-badge
  - progress-bar
  - icon
  - search
  - profile-circle
  - dots-indicator
- **Directives**: Custom directives
- **Pipes**: Custom data transformation pipes
  - currency-format.pipe.ts
  - winnability-status.pipe.ts
- **Utils**: Helper functions and common utilities
  - route-fragment.util.ts
- **Services**: Services used by shared components
  - icon.service.ts
- **States**: Global shared states
  - work-queue.store.ts
- **Enums**: Common enumerations
  - status-colors.enum.ts
  - winnability.enum.ts

Components in the shared module should be stateless or have isolated state and not depend on feature-specific code. If a component is only used within one feature, it should remain in that feature's components folder. Only when a component needs to be shared across multiple features should it be moved to the shared module.

### API Clients

API clients are organized in `src/app/core/api/` and handle all HTTP communication:

```typescript
// Example client structure
@Injectable({
  providedIn: 'root',
})
export class DomainClient {
  constructor(private http: HttpClient) {}
  
  getResource$(id: string): Observable<ResourceType> {
    return this.http.get<ResourceType>(`api/resource/${id}`);
  }
}
```

Each client:
- Is responsible for a specific domain area
- Returns typed responses using shared models
- Focuses on data access, not business logic
- Handles error management and retries when appropriate
- Method names should end with $ to indicate they return observables

### Styling Structure

The project uses SCSS with a structured approach:

- **Variables** - Global SCSS variables for colors, spacing, typography
- **Component Styles** - Scoped styles for each component
- **Shared Styles**:
  - Reusable style partials organized by UI element type
  - Consistent naming patterns with underscore prefix for partials

Style files follow consistent naming conventions and organization to maintain a cohesive visual design across the application.