import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  period: string;
  features: PricingFeature[];
  isPopular?: boolean;
  buttonText: string;
  buttonVariant?: 'primary' | 'outline' | 'outlinePrimary';
  onButtonClick: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  period,
  features,
  isPopular = false,
  buttonText,
  buttonVariant = 'primary',
  onButtonClick
}) => {
  const { isAuthenticated } = useAuth();

  // Define button styles based on variant
  const buttonStyles = {
    primary: "w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg transition",
    outline: "w-full border border-gray-500 text-white hover:bg-dark-bg hover:border-white py-2 px-4 rounded-lg transition",
    outlinePrimary: "w-full border border-primary-light text-primary-light hover:bg-primary-dark/10 py-2 px-4 rounded-lg transition"
  };

  return (
    <div className={`bg-dark-surface ${isPopular ? 'border-2 border-primary' : 'border border-dark-border'} rounded-xl overflow-hidden relative transform ${isPopular ? 'scale-105' : ''}`}>
      {isPopular && (
        <div className="absolute top-0 left-0 right-0 bg-primary text-white text-xs font-medium text-center py-1">
          En Popüler
        </div>
      )}
      
      <div className={`p-6 ${isPopular ? 'mt-4' : ''}`}>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        
        <div className="flex items-end gap-1 mb-6">
          <span className="text-3xl font-bold text-white">{price}</span>
          <span className="text-gray-400 mb-1">/{period}</span>
        </div>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              {feature.included ? (
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              )}
              <span className={feature.included ? "text-gray-300" : "text-gray-400"}>{feature.name}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={buttonStyles[buttonVariant]}
          onClick={isAuthenticated ? onButtonClick : undefined}
          disabled={!isAuthenticated && buttonText !== 'Başla'}
        >
          {!isAuthenticated && buttonText !== 'Başla' ? 'Giriş Yapın' : buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
