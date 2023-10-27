const BASE_URL = 'http://localhost:8080'; 

export const login = async (credentials) => {
  const response = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
  });

    if (!response.ok) {
        throw new Error('Failed to login');
    }

    const data = await response.json();
    return data;
};

export const register = async (credentials) => {
  const response = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
  });

  if (!response.ok) {
      throw new Error('Failed to register');
  }

  const data = await response.json();
  return data;
};

export const createTimeCapsule = async (capsuleData) => {
    const token = localStorage.getItem('jwt_token');

    const formData = new FormData();

    formData.append("title", capsuleData.title);
    formData.append("description", capsuleData.description);
    formData.append("message", capsuleData.message);
    formData.append("openDate", capsuleData.openDate);
    formData.append("userId", capsuleData.userId.toString());
    
    if (capsuleData.media) {
        formData.append('media', capsuleData.media);
    }

    const response = await fetch(`${BASE_URL}/time-capsules`, {
        method: 'POST',
        headers: {

            'Authorization': `Bearer ${token}`
        },
        body: formData, 
    });

    if (!response.ok) {
        throw new Error('Failed to create time capsule');
    }

    const data = await response.json(); 
    return data;
};

export const updateTimeCapsule = async (id, capsuleData) => {
    const token = localStorage.getItem('jwt_token');

    const jsonData = {
        title: capsuleData.title,
        description: capsuleData.description,
        message: capsuleData.message,
        openDate: capsuleData.openDate,
        userId: capsuleData.userId
    };

    const response = await fetch(`${BASE_URL}/time-capsules/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });

    if (!response.ok) {
        throw new Error('Failed to update time capsule');
    }

    const data = await response.json();
    return data;
};


export const getUpcomingTimeCapsules = async () => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(`${BASE_URL}/time-capsules/upcoming`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch upcoming time capsules');
    }

    const data = await response.json();
    return data;
};

export const getPreviousTimeCapsules = async () => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(`${BASE_URL}/time-capsules/previous`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch previous time capsules');
    }

    const data = await response.json();
    return data;
};

export const deleteTimeCapsule = async (id) => {
    console.log("API call to delete capsule with ID:", id); 
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(`${BASE_URL}/time-capsules/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete the time capsule');
    }
};


export const getCurrentUser = async () => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(`${BASE_URL}/api/current-user`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch current user');
    }

    const data = await response.json();
    return data;
};

export const openTimeCapsule = async (id) => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(`${BASE_URL}/time-capsules/${id}/retrieve`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Failed to open the time capsule');
    }

    const data = await response.json();
    return data;
};
export const fetchImage = async (filename) => {
    try {
        const response = await fetch(`/image/${filename}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const image = document.createElement("img");
        image.src = url;
        
        return image;

    } catch (error) {
        console.error("Error fetching image:", error);
    }
}
