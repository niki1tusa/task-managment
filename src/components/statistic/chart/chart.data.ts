// Данные для месячного отображения
export const monthlyData = {
	labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	datasets: [
		{
			data: [0, 10, 30, 10, 30, 5, 25, 40, 20, 35, 15, 45],
			fill: true,
			backgroundColor: "rgba(205, 255, 255, 0.3)",
			borderColor: "rgba(255, 255, 255, 0.8)",
			borderWidth: 2,
			tension: 0.3,
			pointBackgroundColor: "rgba(255, 255, 255, 1)",
			pointBorderColor: "rgba(255, 255, 255, 1)",
			pointRadius: 4,
		},	
	],
};

// Данные для годового отображения
export const yearlyData = {
	labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
	datasets: [
		{
			data: [120, 190, 300, 250, 420, 380],
			fill: true,
			backgroundColor: "rgba(205, 255, 255, 0.3)",
			borderColor: "rgba(255, 255, 255, 0.8)",
			borderWidth: 2,
			tension: 0.3,
			pointBackgroundColor: "rgba(255, 255, 255, 1)",
			pointBorderColor: "rgba(255, 255, 255, 1)",
			pointRadius: 4,
		},
	],
};