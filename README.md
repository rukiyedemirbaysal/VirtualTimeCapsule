# VirtualTimeCapsule
CapStoneProject


Entities:
— User
— Time Capsule
— Media (for images, videos, etc.)
— Message

Relationships:
– A User can create multiple Time Capsules.
– A Time Capsule can contain multiple Media items and Messages.
– Each Media item and Message belongs to a specific Time Capsule 

MySql Workbench
User Table:
– user_id
– username
– password
– email
– created_at

Time Capsule Table:
– capsule_id
– user_id
– title
– description
– open_date
– created_at

Media Table:
– media_id
– capsule_id
– file_name
– file_type
– file_path
– created_at

Message Table:
– message_id
– capsule_id 
— content
– created_at

1. Creating Capsules Component:

- Create a CreateCapsule component that allows users to create a new time capsule.
- Include form elements for users to input the capsule's title, description, and open date.
- Implement form validation to ensure that the user enters valid data.
- Add a submit button to create the capsule and send the data to the back-end API.

2. Uploading Media Component:

- Create a UploadMedia component that allows users to upload images or other media files.
- Implement file input for selecting and uploading media files.
- Display a preview of the uploaded media before submission.
- Include a submit button to upload the media.
  
3. Writing Messages Component:

- Create a WriteMessage component that allows users to write messages to be included in the time capsule.
- Provide a text area for users to compose their messages.
- Include a submit button to save the message.

4. Design

- Make it user-friendly.
  




