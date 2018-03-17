import React from "react";
import { mount } from "enzyme";
import { UserForm } from "./UserForm";

describe("UserForm", () =>
{
  let props;
  let mountedUserForm;

	const userForm = () =>
	{
		if (!mountedUserForm)
		{
			mountedUserForm = mount(
				<UserForm {...props} />
			);
		}

		return mountedUserForm;
	};

	beforeEach(() =>
	{
		props =
		{
			onClickedButton: () => {},
			buttonText: 'btn-text',
			username: 'Bob',
			onChangedUsername: () => {},
		};

		mountedUserForm = undefined;
	});

	it("always renders a div", () =>
	{
		const divs = userForm().find("div");
		expect(divs.length).toBeGreaterThan(0);
	});
});