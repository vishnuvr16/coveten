'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { 
    toggleAnimation, 
    toggleLayout, 
    toggleMenu, 
    toggleNavbar, 
    toggleRTL, 
    toggleTheme, 
    toggleSemidark, 
    resetToggleSidebar, 
    updateBackgroundColor,
    updateHeaderColor,
    updatePrimaryColor,
    updateMenuColor,
    resetColors
} from '@/store/themeConfigSlice';
import IconSettings from '@/components/icon/icon-settings';
import IconX from '@/components/icon/icon-x';
import IconSun from '@/components/icon/icon-sun';
import IconMoon from '@/components/icon/icon-moon';
import IconLaptop from '@/components/icon/icon-laptop';
import { ChromePicker } from 'react-color';
import { Palette, Pipette } from 'lucide-react';

const COLOR_PALETTES = {
    primary: [
        '#4361ee',  // Deep Blue
        '#3a5a40',  // Forest Green
        '#2196f3',  // Light Blue
        '#ff5722',  // Deep Orange
        '#795548',  // Brown
    ],
    background: [
        '#ffffff',  // Pure White
        '#333333',  // Off White
        '#222222',  // Neutral Gray
        '#323232',  // Light Silver
        '#f0f4f8',  // Pale Blue
    ],
    menuColors: [
        '#ffffff',  // Pure White
        '#000000',  // Pure Black
        '#1f2937',  // Dark Gray
        '#3b82f6',  // Blue
        '#10b981',  // Green
    ],
    headerColors: [
        '#ffffff',  // Pure White
        '#000000',  // Pure Black
        '#f8f9fa',  // Light Gray
        '#1f2937',  // Dark Gray
        '#3b82f6',  // Blue
    ]
};

const Setting = () => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    const [showCustomizer, setShowCustomizer] = useState(false);
    const [activeTab, setActiveTab] = useState<'styles' | 'colors'>('styles');
    const [colorPickerType, setColorPickerType] = useState<'primary' | 'background' | 'menu' | 'header' | null>(null);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

    // Expanded state for custom colors
    const [customColors, setCustomColors] = useState({
        primary: themeConfig.primaryColor || '#4361ee',
        background: themeConfig.backgroundColor || '#ffffff',
        menuColor: themeConfig.menuColor || '#ffffff',
        headerColor: themeConfig.headerColor || '#ffffff',
        menuType: 'white',
        headerType: 'white'
    });

    const handleColorChange = (type: 'primary' | 'background' | 'menu' | 'header', color: string) => {
        setCustomColors((prev) => ({
            ...prev,
            [type === 'primary' ? 'primary' : 
             type === 'background' ? 'background' : 
             type === 'menu' ? 'menuColor' : 
             'headerColor']: color,
        }));
    
        // Dispatch appropriate actions for each color type
        switch (type) {
            case 'primary':
                dispatch(updatePrimaryColor(color));
                break;
            case 'background':
                dispatch(updateBackgroundColor(color));
                break;
            case 'menu':
                dispatch(updateMenuColor(color));
                break;
            case 'header':
                dispatch(updateHeaderColor(color));
                break;
        }
    
        setIsColorPickerOpen(false);
        setColorPickerType(null);
    };
    
    
    const renderColorGrid = (colors: string[], type: 'primary' | 'background' | 'menu' | 'header') => (
        <div className="grid grid-cols-6 gap-2">
            {colors.map((color) => (
                <button 
                    key={color} 
                    className="w-10 h-10 rounded-md border-2 border-transparent hover:border-primary transition-all"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(type, color)}
                />
            ))}
            <button 
                className="w-10 h-10 flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-primary rounded-md"
                onClick={() => {
                    setColorPickerType(type);
                    setIsColorPickerOpen(true);
                }}
            >
                <Pipette className="w-5 h-5 text-gray-500" />
            </button>
        </div>
    );

    const renderColorPicker = () => {
        if (!colorPickerType || !isColorPickerOpen) return null;

        return (
            <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-xl relative">
                    <button 
                        className="absolute top-2 right-2 text-gray-500 hover:text-black"
                        onClick={() => setIsColorPickerOpen(false)}
                    >
                        <IconX className="w-5 h-5" />
                    </button>
                    <ChromePicker 
                        color={customColors[
                            colorPickerType === 'primary' ? 'primary' : 
                            colorPickerType === 'background' ? 'background' : 
                            colorPickerType === 'menu' ? 'menuColor' : 
                            'headerColor'
                        ]}
                        onChange={(color) => handleColorChange(colorPickerType, color.hex)}
                    />
                </div>
            </div>
        );
    };

    return (
        <div>
            {/* Backdrop */}
            <div 
                className={`${(showCustomizer && '!block') || ''} fixed inset-0 z-[51] hidden bg-[black]/60 px-4 transition-[display]`} 
                onClick={() => setShowCustomizer(false)}
            ></div>

            {/* Customizer Sidebar */}
            <nav
                className={`${
                    (showCustomizer && 'ltr:!right-0 rtl:!left-0') || ''
                } fixed bottom-0 top-0 z-[51] w-full max-w-[400px] bg-white p-4 shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 ltr:-right-[400px] rtl:-left-[400px] dark:bg-black`}
            >
                {/* Settings Toggle Button */}
                <button
                    type="button"
                    className="absolute bottom-0 top-0 my-auto flex h-10 w-12 cursor-pointer items-center justify-center bg-primary text-white ltr:-left-12 ltr:rounded-bl-full ltr:rounded-tl-full rtl:-right-12 rtl:rounded-br-full rtl:rounded-tr-full"
                    onClick={() => setShowCustomizer(!showCustomizer)}
                >
                    <IconSettings className="h-5 w-5 animate-[spin_3s_linear_infinite]" />
                </button>

                {/* Customizer Content */}
                <div className="perfect-scrollbar h-full overflow-y-auto overflow-x-hidden">
                    {/* Header */}
                    <div className="relative pb-5 text-center">
                        <button 
                            type="button" 
                            className="absolute top-0 opacity-30 hover:opacity-100 ltr:right-0 rtl:left-0 dark:text-white" 
                            onClick={() => setShowCustomizer(false)}
                        >
                            <IconX className="h-5 w-5" />
                        </button>

                        <h4 className="mb-1 dark:text-white">TEMPLATE CUSTOMIZER</h4>
                        <p className="text-white-dark">Customize your template's look and feel.</p>
                    </div>

                    {/* Tab Selector */}
                    <div className="flex mb-4 border-b">
                        <button 
                            className={`flex-1 p-2 transition-colors rounded-l-lg  ${activeTab === 'styles' ? 'bg-primary text-white' : 'bg-gray-200'}`}
                            onClick={() => setActiveTab('styles')}
                        >
                            Theme Styles
                        </button>
                        <button 
                            className={`flex-1 p-2 transition-colors rounded-r-lg ${activeTab === 'colors' ? 'bg-primary text-white' : 'bg-gray-200'}`}
                            onClick={() => setActiveTab('colors')}
                        >
                            Theme Colors
                        </button>
                    </div>

                    {activeTab === 'styles' ? (
                        <>
                            {/* Theme Layout and Other Style Configurations */}
                            <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                                <h5 className="mb-1 text-base leading-none dark:text-white">Navigation Position</h5>
                                <p className="text-xs text-white-dark">Select the primary navigation paradigm for your app.</p>
                                <div className="mt-3 grid grid-cols-3 gap-2">
                                    <button
                                        type="button"
                                        className={`${themeConfig.menu === 'horizontal' ? 'btn-primary' : 'btn-outline-primary'} btn`}
                                        onClick={() => {
                                            dispatch(toggleMenu('horizontal'));
                                            dispatch(resetToggleSidebar());
                                        }}
                                    >
                                        Horizontal
                                    </button>

                                    <button
                                        type="button"
                                        className={`${themeConfig.menu === 'vertical' ? 'btn-primary' : 'btn-outline-primary'} btn`}
                                        onClick={() => {
                                            dispatch(toggleMenu('vertical'));
                                            dispatch(resetToggleSidebar());
                                        }}
                                    >
                                        Vertical
                                    </button>

                                    <button
                                        type="button"
                                        className={`${themeConfig.menu === 'collapsible-vertical' ? 'btn-primary' : 'btn-outline-primary'} btn`}
                                        onClick={() => {
                                            dispatch(toggleMenu('collapsible-vertical'));
                                            dispatch(resetToggleSidebar());
                                        }}
                                    >
                                        Collapsible
                                    </button>
                                </div>
                                <div className="mt-5 text-primary">
                                    <label className="mb-0 inline-flex">
                                        <input type="checkbox" className="form-checkbox" checked={themeConfig.semidark} onChange={(e) => dispatch(toggleSemidark(e.target.checked))} />
                                        <span>Semi Dark (Sidebar & Header)</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                                <h5 className="mb-1 text-base leading-none dark:text-white">Layout Style</h5>
                                <p className="text-xs text-white-dark">Select the primary layout style for your app.</p>
                                <div className="mt-3 flex gap-2">
                                    <button
                                        type="button"
                                        className={`${themeConfig.layout === 'boxed-layout' ? 'btn-primary' : 'btn-outline-primary'} btn flex-auto`}
                                        onClick={() => dispatch(toggleLayout('boxed-layout'))}
                                    >
                                        Box
                                    </button>

                                    <button type="button" className={`${themeConfig.layout === 'full' ? 'btn-primary' : 'btn-outline-primary'} btn flex-auto`} onClick={() => dispatch(toggleLayout('full'))}>
                                        Full
                                    </button>
                                </div>
                            </div>

                            <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                                <h5 className="mb-1 text-base leading-none dark:text-white">Direction</h5>
                                <p className="text-xs text-white-dark">Select the direction for your app.</p>
                                <div className="mt-3 flex gap-2">
                                    <button type="button" className={`${themeConfig.rtlClass === 'ltr' ? 'btn-primary' : 'btn-outline-primary'} btn flex-auto`} onClick={() => dispatch(toggleRTL('ltr'))}>
                                        LTR
                                    </button>

                                    <button type="button" className={`${themeConfig.rtlClass === 'rtl' ? 'btn-primary' : 'btn-outline-primary'} btn flex-auto`} onClick={() => dispatch(toggleRTL('rtl'))}>
                                        RTL
                                    </button>
                                </div>
                            </div>

                            <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                                <h5 className="mb-1 text-base leading-none dark:text-white">Navbar Type</h5>
                                <p className="text-xs text-white-dark">Sticky or Floating.</p>
                                <div className="mt-3 flex items-center gap-3 text-primary">
                                    <label className="mb-0 inline-flex">
                                        <input
                                            type="radio"
                                            checked={themeConfig.navbar === 'navbar-sticky'}
                                            value="navbar-sticky"
                                            className="form-radio"
                                            onChange={() => dispatch(toggleNavbar('navbar-sticky'))}
                                        />
                                        <span>Sticky</span>
                                    </label>
                                    <label className="mb-0 inline-flex">
                                        <input
                                            type="radio"
                                            checked={themeConfig.navbar === 'navbar-floating'}
                                            value="navbar-floating"
                                            className="form-radio"
                                            onChange={() => dispatch(toggleNavbar('navbar-floating'))}
                                        />
                                        <span>Floating</span>
                                    </label>
                                    <label className="mb-0 inline-flex">
                                        <input
                                            type="radio"
                                            checked={themeConfig.navbar === 'navbar-static'}
                                            value="navbar-static"
                                            className="form-radio"
                                            onChange={() => dispatch(toggleNavbar('navbar-static'))}
                                        />
                                        <span>Static</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                                <h5 className="mb-1 text-base leading-none dark:text-white">Router Transition</h5>
                                <p className="text-xs text-white-dark">Animation of main content.</p>
                                <div className="mt-3">
                                    <select className="form-select border-primary text-primary" value={themeConfig.animation} onChange={(e) => dispatch(toggleAnimation(e.target.value))}>
                                        <option value=" ">None</option>
                                        <option value="animate__fadeIn">Fade</option>
                                        <option value="animate__fadeInDown">Fade Down</option>
                                        <option value="animate__fadeInUp">Fade Up</option>
                                        <option value="animate__fadeInLeft">Fade Left</option>
                                        <option value="animate__fadeInRight">Fade Right</option>
                                        <option value="animate__slideInDown">Slide Down</option>
                                        <option value="animate__slideInLeft">Slide Left</option>
                                        <option value="animate__slideInRight">Slide Right</option>
                                        <option value="animate__zoomIn">Zoom In</option>
                                    </select>
                                </div>
                            </div>

                        </>
                    ) : (
                        <>
                            <div className="space-y-4">
                                <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                                    <h5 className="mb-1 text-base leading-none dark:text-white">Color Scheme</h5>
                                    <p className="text-xs text-white-dark">Overall light or dark presentation.</p>
                                    <div className="mt-3 grid grid-cols-3 gap-2">
                                        {['light', 'dark', 'system'].map((themeType) => (
                                            <button 
                                                key={themeType}
                                                type="button" 
                                                className={`${themeConfig.theme === themeType ? 'btn-primary' : 'btn-outline-primary'} btn capitalize flex items-center justify-center`} 
                                                onClick={() => dispatch(toggleTheme(themeType))}
                                            >
                                                {themeType === 'light' && <IconSun className="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2" />}
                                                {themeType === 'dark' && <IconMoon className="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2" />}
                                                {themeType === 'system' && <IconLaptop className="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2" />}
                                                {themeType}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {/* Theme Primary Color */}
                                <div className="rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                                    <h5 className="mb-2 text-base dark:text-white flex items-center">
                                        Theme Primary Color 
                                        <Palette className="ml-2 w-5 h-5 text-primary" />
                                    </h5>
                                    {renderColorGrid(COLOR_PALETTES.primary, 'primary')}
                                </div>

                                {/* Background Color */}
                                <div className="rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                                    <h5 className="mb-2 text-base dark:text-white flex items-center">
                                        Background Color
                                        <Palette className="ml-2 w-5 h-5 text-primary" />
                                    </h5>
                                    {renderColorGrid(COLOR_PALETTES.background, 'background')}
                                </div>

                                {/* Menu Color */}
                                <div className="rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                                    <h5 className="mb-2 text-base dark:text-white flex items-center">
                                        Menu Color
                                        <Palette className="ml-2 w-5 h-5 text-primary" />
                                    </h5>
                                    {renderColorGrid(COLOR_PALETTES.menuColors, 'menu')}
                                </div>

                                {/* Header Color */}
                                <div className="rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                                    <h5 className="mb-2 text-base dark:text-white flex items-center">
                                        Header Color
                                        <Palette className="ml-2 w-5 h-5 text-primary" />
                                    </h5>
                                    {renderColorGrid(COLOR_PALETTES.headerColors, 'header')}
                                </div>
                                <button 
                                    type="button" 
                                    className={`btn-outline-primary btn capitalize flex items-center justify-center`} 
                                    onClick={() => dispatch(resetColors())}
                                >
                                    Reset
                                </button>
                            </div>
                        </>
                    )}
                    {renderColorPicker()}
                </div>
            </nav>
        </div>
    );
};

export default Setting;