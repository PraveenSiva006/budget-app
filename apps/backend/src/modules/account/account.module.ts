import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountBalanceService } from '@/modules/account/account.balance';

@Module({
  controllers: [AccountController],
  providers: [AccountService, AccountBalanceService],
  exports: [AccountService],
})
export class AccountModule {}
