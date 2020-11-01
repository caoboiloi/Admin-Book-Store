import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { AccountComponent } from './components/account/account.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProviderComponent } from './components/provider/provider.component';
import { PublisherComponent } from './components/publisher/publisher.component';
import { UserComponent } from './components/user/user.component';
import { BookComponent } from './components/book/book.component';
import { ShipperComponent } from './components/shipper/shipper.component';
import { EditComponent } from './components/edit/edit.component';
import { AddComponent } from './components/add/add.component';
import { AuthorComponent } from './components/author/author.component';

import { AuthGaurdService } from './services/auth-gaurd.service';

export const appRouter: Routes = [
	{
		path: '',
		redirectTo: 'admin/staff',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'admin',
		component: AdminComponent,
		canActivate: [AuthGaurdService],
		children: [
			{
				path: 'add',
				component: AddComponent,
				canActivate: [AuthGaurdService]
			},
			{
				path: 'edit',
				component: EditComponent,
				canActivate: [AuthGaurdService]
			},
			{
				path: 'staff',
				component: AccountComponent,
				canActivate: [AuthGaurdService]
			},
			{
				path: 'provider',
				component: ProviderComponent,
				canActivate: [AuthGaurdService]
			},
			{
				path: 'publisher',
				component: PublisherComponent,
				canActivate: [AuthGaurdService]
			},
			{
				path: 'author',
				component: AuthorComponent,
				canActivate: [AuthGaurdService]
			},
			{
				path: 'user',
				component: UserComponent,
				canActivate: [AuthGaurdService]
			},
			{
				path: 'book',
				component: BookComponent,
				canActivate: [AuthGaurdService]
			},
			{
				path: 'shipper',
				component: ShipperComponent,
				canActivate: [AuthGaurdService]
			}
		]
	},
	{
		path: 'logout',
		component: LogoutComponent,
		canActivate: [AuthGaurdService]
	},
	{
		path: '**',
		component: ErrorComponent,
		canActivate: [AuthGaurdService],
	}

]