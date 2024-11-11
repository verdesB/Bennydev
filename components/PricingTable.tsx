import React from 'react';

interface Plan {
  id: string;
  name: string;
  price: string;
}

interface FeatureValue {
  [key: string]: string | boolean;
}

interface Feature {
  name: string;
  values: FeatureValue;
}

interface PricingTableProps {
  plans: Plan[];
  features: Feature[];
}

const PricingTable: React.FC<PricingTableProps> = ({ plans, features }) => {
  return (
    <div className="max-w-6xl mx-auto overflow-x-auto px-4 sm:px-6 lg:px-8 relative z-20 ">
      <div className="mt-8 shadow-lg rounded-lg overflow-hidden mb-16">
        <table className="w-full divide-y divide-gray-200 bg-white">
          <thead>
            <tr className="divide-x divide-gray-200">
              <th className="py-6 px-6 text-left bg-gray-50">
                <span className="text-sm font-semibold text-gray-900">Caractéristiques</span>
              </th>
              {plans.map((plan) => (
                <th key={plan.id} className="py-6 px-6 bg-gray-50">
                  <span className="text-sm font-semibold text-gray-900">{plan.name}</span>
                  <div className="mt-2 text-2xl font-bold text-blue-600">{plan.price}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {features.map((feature) => (
              <tr 
                key={feature.name}
                className={`divide-x divide-gray-200 hover:bg-gray-50 transition-colors`}
              >
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {feature.name}
                </td>
                {plans.map((plan) => (
                  <td 
                    key={`${feature.name}-${plan.id}`}
                    className="py-4 px-6 text-sm text-center text-gray-500"
                  >
                    {typeof feature.values[plan.id] === 'boolean' ? (
                      feature.values[plan.id] ? (
                        <span className="text-green-500 text-lg">✓</span>
                      ) : (
                        <span className="text-red-500 text-lg">✗</span>
                      )
                    ) : (
                      feature.values[plan.id]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingTable; 