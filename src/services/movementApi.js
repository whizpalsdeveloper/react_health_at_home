const API_BASE_URL = 'https://api.example.com';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

const STATIC_CATEGORIES = [
  {
    id: 1,
    title: "Chronic Diseases",
    description: "FunAndMoving.com has built an entire platform of routines specifically for all of us suffering from chronic diseases. Here are a just a few of our over 1650 designed for High Blood Pressure, Diabetes, COPD, and Parkinson's.",
    image: "/images/chronic_diseases.jpg",
    routineCount: 1650
  },
  {
    id: 2,
    title: "Memory",
    description: "Exercises designed to improve cognitive function and memory retention through targeted movement routines.",
    image: "/images/memory.jpg",
    routineCount: 245
  },
  {
    id: 3,
    title: "Bed Routines",
    description: "Gentle exercises that can be performed from bed for those with limited mobility or during recovery periods.",
    image: "/images/bed_routines.jpg",
    routineCount: 180
  },
  {
    id: 4,
    title: "Balance and Fall Prevention",
    description: "Specialized routines to improve balance and prevent falls in older adults, focusing on stability and coordination.",
    image: "/images/balance.jpg",
    routineCount: 320
  }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const movementApi = {
  async getCategories() {
    try {
      await delay(500);
      return {
        success: true,
        data: STATIC_CATEGORIES
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return {
        success: false,
        error: 'Failed to fetch categories'
      };
    }
  },

  async getCategoryById(id) {
    try {
      await delay(300);
      const category = STATIC_CATEGORIES.find(cat => cat.id === parseInt(id));
      
      if (!category) {
        return {
          success: false,
          error: 'Category not found'
        };
      }
      
      return {
        success: true,
        data: category
      };
    } catch (error) {
      console.error('Error fetching category:', error);
      return {
        success: false,
        error: 'Failed to fetch category'
      };
    }
  },

  async getCategoryRoutines(categoryId) {
    try {
      await delay(800);
      const routines = [
        {
          id: 1,
          title: "Morning Stretch Routine",
          duration: "15 minutes",
          difficulty: "Beginner",
          categoryId: categoryId
        },
        {
          id: 2,
          title: "Evening Relaxation",
          duration: "20 minutes", 
          difficulty: "Easy",
          categoryId: categoryId
        }
      ];
      
      return {
        success: true,
        data: routines
      };
    } catch (error) {
      console.error('Error fetching routines:', error);
      return {
        success: false,
        error: 'Failed to fetch routines'
      };
    }
  }
};

export default movementApi;