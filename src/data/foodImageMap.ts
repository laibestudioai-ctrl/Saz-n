// Helper to provide realistic food images and icons for visually detected items

export function getFoodImageAndIcon(name: string, category: string): { imageUrl: string; icon: string } {
  const lower = name.toLowerCase();

  if (lower.includes('leche')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
      icon: 'water_drop',
    };
  }
  if (lower.includes('huevo')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?w=600&auto=format&fit=crop&q=80',
      icon: 'egg',
    };
  }
  if (lower.includes('queso') || lower.includes('cheese') || lower.includes('parmesano')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&auto=format&fit=crop&q=80',
      icon: 'lunch_dining',
    };
  }
  if (lower.includes('yogur') || lower.includes('yogurt')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80',
      icon: 'icecream',
    };
  }
  if (lower.includes('pollo') || lower.includes('pechuga')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&auto=format&fit=crop&q=80',
      icon: 'set_meal',
    };
  }
  if (lower.includes('salmón') || lower.includes('salmon') || lower.includes('pescado') || lower.includes('atún')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80',
      icon: 'phishing',
    };
  }
  if (lower.includes('carne') || lower.includes('ternera') || lower.includes('beef')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=600&auto=format&fit=crop&q=80',
      icon: 'kebab_dining',
    };
  }
  if (lower.includes('tomate')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      icon: 'nutrition',
    };
  }
  if (lower.includes('aguacate') || lower.includes('avocado')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80',
      icon: 'eco',
    };
  }
  if (lower.includes('espinaca') || lower.includes('lechuga') || lower.includes('ensalada')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80',
      icon: 'grass',
    };
  }
  if (lower.includes('zanahoria')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop&q=80',
      icon: 'nutrition',
    };
  }
  if (lower.includes('pasta') || lower.includes('fusilli') || lower.includes('espagueti')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=600&auto=format&fit=crop&q=80',
      icon: 'ramen_dining',
    };
  }
  if (lower.includes('arroz') || lower.includes('rice')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
      icon: 'grain',
    };
  }
  if (lower.includes('aceite')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
      icon: 'opacity',
    };
  }
  if (lower.includes('garbanzo') || lower.includes('lenteja') || lower.includes('legumbre') || lower.includes('alubia')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=600&auto=format&fit=crop&q=80',
      icon: 'spa',
    };
  }
  if (lower.includes('fruta') || lower.includes('manzana') || lower.includes('platano') || lower.includes('banana')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80',
      icon: 'nutrition',
    };
  }
  if (lower.includes('pan') || lower.includes('bread') || lower.includes('tostada')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
      icon: 'bakery_dining',
    };
  }

  // Generic category fallbacks
  switch (category) {
    case 'Vegetables':
      return {
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
        icon: 'eco',
      };
    case 'Proteins':
      return {
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
        icon: 'set_meal',
      };
    case 'Dairy':
      return {
        imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
        icon: 'water_drop',
      };
    case 'Grains':
      return {
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
        icon: 'grain',
      };
    default:
      return {
        imageUrl: 'https://images.unsplash.com/photo-1584990347449-39906663f736?w=600&auto=format&fit=crop&q=80',
        icon: 'inventory_2',
      };
  }
}
