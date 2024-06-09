import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../../services/apiconnector";
import { contactusEndpoint } from "../../../services/apis";
import CountryCode from "../../../data/countrycode.json";
const ContactUsForm = () => {
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	const submitContactForm = async (data) => {
		console.log("Logging Data", data);
		try {
			setLoading(true);
			// const response = await apiConnector("POST" , contactusEndpoint.CONTACT_US_API , data)
			const response = { status: "OK" };
			console.log("Logging response", response);
			setLoading(false);
		} catch (error) {
			console.log("Error", error.message);
		}
	};

	useEffect(() => {
		reset({
			email: "",
			firstName: "",
			lastName: "",
			message: "",
			phoneNo: "",
		});
	}, [reset, isSubmitSuccessful]);
	return (
		<form onSubmit={handleSubmit(submitContactForm)}>
			<div className=" gap-5">
				<div className="flex flex-col   text-white">
					<label htmlFor="firstname">
						First Name <span className="color:red">*</span>
					</label>
					<input
						type="text"
						placeholder=" Enter First Name"
						name="firstname"
						id="firstname"
						className="text-black"
						{...register("firstname", { required: true })}
					/>
					{errors.firstName && <span>Please Enter Your Name</span>}
				</div>

				<div className="flex flex-col text-white  ">
					<label htmlFor="lastname">Last Name</label>
					<input
						type="text"
						placeholder=" Enter Last Name"
						name="lastname"
						className="text-black"
						id="lastname"
						{...register("lastname")}
					/>
				</div>
			</div>

			{/* email */}
			<div className="flex flex-col text-white">
				<label>Email</label>
				<input
					type="email"
					className="text-black"
					id="email"
					name="email"
					placeholder="Enter email address"
					{...register("email", { required: true })}
				/>
				{errors.email && <span>Please Enter your Email</span>}
			</div>

			{/* Phone Number */}
			<div className="flex flex-col gap-2">
				<label htmlFor="phonenumber">Phone Number</label>
				<div className="flex flex-row gap-5">
					{/* dropdown */}
					<select
						className="text-black"
						name="dropdown"
						id="dropdown"
						{...register("countrycode", { required: true })}
					>
						{CountryCode.map((element, index) => {
							return (
								<option key={index} value={element.code}>
									{element.code}-{element.country}
								</option>
							);
						})}
					</select>

					<div>
						<input
							className="text-black"
							type="number"
							id="phonenumber"
              name="phonenumber"
							placeholder="Enter Phone Number"
							{...register("phoneNo") , 
            {
              required :{ value:true , message:"Please enter phone Number"} ,
              maxLength : {value:10 , message:"Invalid Phone Number"},
              minLength:{value:8 , message:"Invalid Phone Number"}
            }}
						/>
						{errors.number && (
							<span className="text-red">Please Enter your Phone Number</span>
						)}
					</div>
				</div>
			</div>

			{/* message */}
			<div className="flex flex-col text-white">
				<label htmlFor="meassage">Message</label>
				<textarea
					name="message"
					className="text-black"
					id="message"
					cols="30"
					rows="7"
					placeholder="Write Message here"
					{...register("message", { required: true })}
				/>
				{errors.message && <span>Please Enter Message</span>}
			</div>

			{/* Button */}
			<button
				type="submit"
				className="rounded-md bg-yellow-50 px-9  mt-5  items-center text-center text-black font-bold"
			>
				Send Message
			</button>
		</form>
	);
};

export default ContactUsForm;
