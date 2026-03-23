Frontend must use React with TypeScript.

Use a consistent design system and create reusable components for: buttons, inputs, forms, tables, modals, and alerts.

API calls must be handled through a service layer, never directly inside components.

Large forms must be split into steps using a wizard or stepper pattern.
Provide good user experience with loading states, error states, and success feedback.

## Modular Project Structure

The frontend project MUST strictly follow a feature-based, modular directory structure.
Each feature/domain module must contain the following specific directories:

- `hooks/`: Contains the business logic, state management, and custom hooks for the module's screens.
- `screens/`: Contains the page/view components for the module.
- `components/`: Contains UI components that are EXCLUSIVE to this module.
- `services/`: Contains the files responsible for making API calls related to this module.
- `utils/`: Contains reusable utility functions and TypeScript types/interfaces specific to the module.

## Global/Shared Code

Always create a global `common/` directory at the root level of the application.
This directory MUST contain all global and reusable code, including global UI components, generic hooks, and cross-module utilities.
