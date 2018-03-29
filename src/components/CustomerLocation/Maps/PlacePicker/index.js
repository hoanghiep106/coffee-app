import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { googleConfig } from '../../../../config/app';

const PlacePicker = ({
  value,
  onAddressChange,
  onBlurAddress,
  handlePlaceSelect
}) => {
  const googlePlacesOptions = {
    componentRestrictions: {
      country: googleConfig.currentCountry,
    },
  };
  const inputProps = {
    value,
    onChange: onAddressChange,
    placeholder: t('FROM'),
    onBlur: onBlurAddress,
  };
  return (
    <PlacesAutocomplete
      inputProps={inputProps}
      options={googlePlacesOptions}
      onSelect={handlePlaceSelect}
      clearItemsOnError
      debounce={300}
    />
  );
};

export default PlacePicker;
