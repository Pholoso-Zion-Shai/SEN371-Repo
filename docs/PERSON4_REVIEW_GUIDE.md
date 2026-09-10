# Person 4 Review Guide

This guide helps Person 4 perform an independent review of Pull Request #1. Person 4 should verify each point against the changed files, write their own comments, and make the final approval decision.

## Suggested review areas

### API implementation

- Confirm that the Express server mounts the authentication, resource, product, and booking routes correctly.
- Check that successful responses and error responses use consistent status codes and response shapes.
- Verify that missing records return `404` responses instead of successful empty responses.
- Check whether booking creation validates that the referenced resource exists and is available.

### Data handling

- Confirm that user passwords are stored only as bcrypt hashes.
- Check that Mongoose schemas validate required fields, numeric ranges, and enum values.
- Verify that booking ownership is enforced when a user reads or updates bookings.
- Check whether date and time values are validated consistently enough to prevent invalid or overlapping bookings.
- Confirm whether the frontend is using API data or still relying on mock resources, products, and bookings.

### Security integration

- Verify that protected routes require a valid Bearer token.
- Confirm that admin-only actions enforce the role on the backend, not only in the frontend.
- Check that JWT secrets and database credentials are supplied through environment variables and are excluded from Git.
- Recommend restricting CORS origins and removing fallback production secrets before deployment.
- Check whether rate limiting, secure headers, and request validation are needed for the deployment environment.

## Example comment topics

These are topics Person 4 may turn into comments after independently confirming them:

- The frontend currently imports mock data directly, so resource, product, and booking screens are not yet fully connected to the API.
- The API client stores the JWT but does not attach it to later protected requests.
- Booking creation accepts client-provided resource names and prices; the server should derive trusted values from the database.
- The backend can start while MongoDB connection fails, which can make the health endpoint appear healthy when data operations are unavailable.

## Evidence to capture

After the review is genuinely completed, capture screenshots showing:

1. Person 4 listed as the reviewer.
2. Their review comments or suggestions on the PR.
3. The author's responses or resulting fixes.
4. Person 4's formal **Approve** review.

The reviewer must write the final comments and decide whether to approve the PR themselves.
