export const keyIconMap: { [key: string]: string } = {
    bearing_temperatures: 'thermometer-half',
    d_side_vertical_horizontal_axial_accelaration_ptp: 'arrows-alt',
    d_side_vertical_horizontal_axial_accelaration_rms: 'tachometer',
    d_side_vertical_horizontal_axial_displacement_ptp: 'exchange',
    d_side_vertical_horizontal_axial_displacement_rms: 'expand',
    d_side_vertical_horizontal_axial_velocity_ptp: 'bolt',
    d_side_vertical_horizontal_axial_velocity_rms: 'tachometer',
    date: 'calendar',
    encoder_direction_correct: 'check-circle',
    encoder_offset_angle: 'angle-double-right',
    heater_resistance_d_side: 'fire',
    heater_resistance_n_side: 'fire',
    id_flux_linkage_pu: 'magnet',
    id_ld_inductance_si: 'magnet',
    id_lq_inductance_si: 'magnet',
    id_ltd_inductance_si: 'magnet',
    id_ltq_inductance_si: 'magnet',
    id_rs_resistance_si: 'magnet',
    insulation_resistance: 'shield',
    maximum_noise: 'volume-up',
    maximum_torque: 'cogs',
    motor_temperatures: 'thermometer-full',
    motor_type: 'car',
    n_side_vertical_horizontal_axial_accelaration_ptp: 'arrows-alt',
    n_side_vertical_horizontal_axial_accelaration_rms: 'tachometer',
    n_side_vertical_horizontal_axial_displacement_ptp: 'exchange',
    n_side_vertical_horizontal_axial_displacement_rms: 'expand',
    n_side_vertical_horizontal_axial_velocity_ptp: 'bolt',
    n_side_vertical_horizontal_axial_velocity_rms: 'tachometer',
    pressure_test_passed: 'check',
    rotation_direction_correct: 'check-circle',
    serial_number: 'barcode',
};

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
    light: {
        text: '#000',
        background: '#fff',
        tint: tintColorLight,
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorLight,
    },
    dark: {
        text: '#fff',
        background: '#000',
        tint: tintColorDark,
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorDark,
    },
};
